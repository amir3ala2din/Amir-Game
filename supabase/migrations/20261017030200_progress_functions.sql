-- ============ FUNCTIONS ============
-- keep the best (highest) score per game
create function public.save_best(p_game_id text, p_pct int)
returns void language sql security invoker set search_path = '' as $$
  insert into public.game_best (game_id, pct) values (p_game_id, p_pct)
  on conflict (user_id, game_id) do update
    set pct = greatest(public.game_best.pct, excluded.pct), updated_at = now();
$$;
