export interface lol {
  bgColor: string;
  summonerName: string;
  server:string;
}


export interface peripheral{
  periph:string;
  link:string;
  name:string;
}
export interface apex {
  bgColor: string;
  username: string;
  platform: string;
  uid:string;
}
export interface user {
  avatar_url?: string;
  background?: string;
  full_name?: string;
  id?: id;
  lol?: lol;
  updated_at?: null;
  username?: string;
  website?: string;
  apex: apex;
  setup: peripheral[];
}
