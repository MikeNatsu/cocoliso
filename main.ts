import { GameDetails, GameInfo } from "./types.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { CreatePageBodyParameters } from "https://deno.land/x/notion_sdk@v2.2.3/src/api-endpoints.ts";
import { Client } from "https://deno.land/x/notion_sdk@v2.2.3/src/mod.ts";


const env = await load();
const token = env["NOTION_TOKEN"];
const notion = new Client({
  auth: token,
})
const mainPage = env['PAGE_ID'];


async function getPage(databaseId: string, id: string): Promise<string | null> {

  const response = await notion.databases.query({
    database_id: databaseId,
    "filter": {
      "property": "ID",
      "rich_text": {
        "equals": id,
      }
    }
  });
  return response.results?.[0]?.id ?? null
}

async function getGameDetails(appId: GameInfo['appid']) {
  const params = new URLSearchParams({
    appids: appId.toString(),
  })
  const res = await fetch('http://store.steampowered.com/api/appdetails?' + params.toString());
  const data = await res.json() as unknown as Record<GameInfo['appid'], { success: boolean, data: GameDetails }>;
  return data?.[appId]?.data ?? null;

}


// deno-lint-ignore no-explicit-any
async function getNewProperties(game: GameInfo, pageId?: string): Promise<Record<string, any>> {
  const details = await getGameDetails(game.appid);
  const body = {
    properties: {
      "ID": {
        type: "rich_text",
        rich_text: [{
          type: "text",
          text: {
            content: String(game.appid)
          }
        }],
      },
      "Name": {
        type: "title",
        title: [{
          type: "text",
          text: {
            content: game.name,
          },
        }]
      },
      "Generos": {
        type: "multi_select",
        multi_select: (details?.genres?.map(genre => ({ name: genre.description?.replaceAll(',', ' ') })) ?? []),
      },
      "Categories": {
        type: "multi_select",
        multi_select: details?.categories?.map(category => ({ name: category.description?.replaceAll(',', ' ') })) ?? [],
      },
      "Desarrollador": {
        type: "multi_select",
        multi_select: details?.developers?.map(dev => ({ name: dev?.replaceAll(',', ' ') ?? "" })) ?? []
      },
    } as CreatePageBodyParameters['properties']
  }
  return body;
}

async function updateEntries(games: GameInfo[]) {
  const db = await notion.search({
    query: "Steam Videojuegos",
    filter: {
      property: "object",
      value: "database"
    }
  })
  const dbId = db?.results?.at(0)?.id;
  if (!dbId) {
    console.log("Database ID not found");
    return;
  }
  for (const game of games) {
    const pageId = await getPage(dbId, String(game.appid));
    const props = await getNewProperties(game, pageId ?? undefined)
    if (pageId) {
      await notion.pages.update({
        page_id: pageId,
        properties: props,
      })

    } else {
      await notion.pages.create({
        parent: {
          database_id: dbId,
        },
        icon: {
          type: "external",
          external: {
            url: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
          }
        },
        properties: props,
      })


    }

  }

}
async function createDatabase() {
  const db = await notion.search({
    query: "Steam Videojuegos",
    filter: {
      property: "object",
      value: "database"
    }
  })
  if (db?.results?.length !== 0) {
    console.log("Database was already created. Skipping...")
    return;
  }
  await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: mainPage,
    },
    title: [{
      type: "text",
      text: {
        content: "Steam Videojuegos"
      }
    }],
    properties: {
      "ID": {
        type: "rich_text",
        rich_text: {}
      },
      "Name": {
        type: "title",
        title: {}
      },
      "Generos": {
        type: "multi_select",
        multi_select: {}
      },
      "Categories": {
        type: "multi_select",
        multi_select: {}
      },
      "Desarrollador": {
        type: "multi_select",
        multi_select: {}
      },
      "Rating": {
        type: "number",
        number: {}
      },
      "Date Started": {
        type: "date",
        date: {}
      },
      "Status": {
        type: "status",
        status: {}
      },
      "Date Finished": {
        type: "date",
        date: {}
      },
    }
  })

}

async function getSteamAccountData() {
  const env = await load();
  const apiKey = env["STEAM_KEY"];
  const accountId = env["STEAM_ACCOUNT_ID"];
  const params = new URLSearchParams({
    steamid: accountId,
    key: apiKey,
    include_appinfo: "1",
  })
  const res = await fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001?' + params.toString());
  const data = await res.json() as unknown as { response: { games: GameInfo[] } };
  return data.response.games;
}

if (import.meta.main) {
  const games = await getSteamAccountData();
  await createDatabase()
  await updateEntries(games);

}
