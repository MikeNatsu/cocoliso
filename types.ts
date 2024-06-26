
export interface GameInfo {
  appid: number
  name: string
  playtime_forever: number
  img_icon_url: string
  has_community_visible_stats?: boolean
  playtime_windows_forever: number
  playtime_mac_forever: number
  playtime_linux_forever: number
  playtime_deck_forever: number
  rtime_last_played: number
  playtime_disconnected: number
  content_descriptorids?: number[]
  has_leaderboards?: boolean
  playtime_2weeks?: number
}

export interface GameDetails {
  type: string
  name: string
  steam_appid: number
  required_age: number
  is_free: boolean
  controller_support: string
  detailed_description: string
  about_the_game: string
  short_description: string
  supported_languages: string
  header_image: string
  capsule_image: string
  capsule_imagev5: string
  website: string
  pc_requirements: PcRequirements
  mac_requirements: MacRequirements
  linux_requirements: LinuxRequirements
  legal_notice: string
  drm_notice: string
  developers: string[]
  publishers: string[]
  price_overview: PriceOverview
  packages: number[]
  package_groups: PackageGroup[]
  platforms: Platforms
  metacritic: Metacritic
  categories: Category[]
  genres: Genre[]
  screenshots: Screenshot[]
  movies: Movie[]
  recommendations: Recommendations
  achievements: Achievements
  release_date: ReleaseDate
  support_info: SupportInfo
  background: string
  background_raw: string
  content_descriptors: ContentDescriptors
  ratings: Ratings
}

export interface PcRequirements {
  minimum: string
  recommended: string
}

export interface MacRequirements {
  minimum: string
  recommended: string
}

export interface LinuxRequirements {
  minimum: string
  recommended: string
}

export interface PriceOverview {
  currency: string
  initial: number
  final: number
  discount_percent: number
  initial_formatted: string
  final_formatted: string
}

export interface PackageGroup {
  name: string
  title: string
  description: string
  selection_text: string
  save_text: string
  display_type: number
  is_recurring_subscription: string
  subs: Sub[]
}

export interface Sub {
  packageid: number
  percent_savings_text: string
  percent_savings: number
  option_text: string
  option_description: string
  can_get_free_license: string
  is_free_license: boolean
  price_in_cents_with_discount: number
}

export interface Platforms {
  windows: boolean
  mac: boolean
  linux: boolean
}

export interface Metacritic {
  score: number
  url: string
}

export interface Category {
  id: number
  description: string
}

export interface Genre {
  id: string
  description: string
}

export interface Screenshot {
  id: number
  path_thumbnail: string
  path_full: string
}

export interface Movie {
  id: number
  name: string
  thumbnail: string
  webm: Webm
  mp4: Mp4
  highlight: boolean
}

export interface Webm {
  "480": string
  max: string
}

export interface Mp4 {
  "480": string
  max: string
}

export interface Recommendations {
  total: number
}

export interface Achievements {
  total: number
  highlighted: Highlighted[]
}

export interface Highlighted {
  name: string
  path: string
}

export interface ReleaseDate {
  coming_soon: boolean
  date: string
}

export interface SupportInfo {
  url: string
  email: string
}

export interface ContentDescriptors {
  ids: any[]
  notes: any
}

export interface Ratings {
  oflc: Oflc
  kgrb: Kgrb
  usk: Usk
  fpb: Fpb
  cero: Cero
  pegi: Pegi
  crl: Crl
  dejus: Dejus
  esrb: Esrb
  steam_germany: SteamGermany
}

export interface Oflc {
  rating: string
  descriptors: string
}

export interface Kgrb {
  rating: string
  descriptors: string
}

export interface Usk {
  rating: string
  descriptors: string
}

export interface Fpb {
  rating: string
  descriptors: string
}

export interface Cero {
  rating: string
  descriptors: string
}

export interface Pegi {
  rating: string
  descriptors: string
}

export interface Crl {
  rating: string
}

export interface Dejus {
  rating: string
  descriptors: string
}

export interface Esrb {
  rating: string
  descriptors: string
}

export interface SteamGermany {
  rating_generated: string
  rating: string
  required_age: string
  banned: string
  use_age_gate: string
  descriptors: string
}


export interface AchievementAPI {
  playerstats: Playerstats
}

export interface Playerstats {
  steamID: string
  gameName: string
  achievements: Achievement[]
  success: boolean
}

export interface Achievement {
  apiname: string
  achieved: number
  unlocktime: number
}

