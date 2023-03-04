export interface lol {
  bgColor?: string;
  summonerName?: string;
  server?:string;
}


 interface peripheral{
  periph?:string;
  link?:string;
  name?:string;
}
 interface apex {
  bgColor?: string;
  username?: string;
  platform?: string;
  uid?:string;
}
 interface valorant{
  bgColor?: string;
  username?: string;
  server?: string;
  tagline?:string;

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
  apex?: apex;
  setup?: peripheral[];
  valorant?:valorant
}
