export interface Team {
    id_startup: string;
    name: string;
    slogan: string;
    score: number;
    convincing_pitches?: boolean;
    bugged_products?: boolean;
    user_traction?: boolean;
    pissed_investor?: boolean;
    fake_news_pitches?: boolean;
}