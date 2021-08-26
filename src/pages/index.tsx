import { lazy } from "react";

export const HomoPage = lazy(()=>import("./Home/Home"))
export const FavoriteCitiesPage = lazy(()=>import("./FavoriteCitites/FavoriteCities"))