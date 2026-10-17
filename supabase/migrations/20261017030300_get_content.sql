-- the whole `Content` document (types/content.types.ts) in one round trip
create function public.get_content()
returns jsonb language sql stable security invoker set search_path = '' as $$
select jsonb_build_object(
  'vocab', (select jsonb_object_agg(g.code, coalesce((
      select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('en', w.en, 'ar', w.ar, 'e', w.emoji)) order by w.sort)
      from public.words w where w.grade = g.code), '[]'::jsonb)) from public.grades g),
  'extraWords', (select jsonb_object_agg(s.stage, (
      select jsonb_object_agg(p.pos, coalesce((
          select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('en', w.en, 'ar', w.ar, 'e', w.emoji)) order by w.sort)
          from public.words w where w.stage = s.stage and w.pos = p.pos), '[]'::jsonb))
      from (values ('n'), ('v'), ('a'), ('x')) p (pos)))
    from (values ('P'), ('M'), ('S')) s (stage)),
  'opposites', (select jsonb_object_agg(g.code, coalesce((
      select jsonb_agg(jsonb_build_object('en', o.en, 'ar', o.ar, 'opp', o.opp, 'oppAr', o.opp_ar) order by o.sort)
      from public.grade_opposites o where o.grade = g.code), '[]'::jsonb)) from public.grades g),
  'groups', (select jsonb_object_agg(g.code, coalesce((
      select jsonb_agg(jsonb_build_array(t.name_en, t.name_ar, t.emoji, t.term, array_to_string(t.words, ',')) order by t.sort)
      from public.topic_groups t where t.grade = g.code), '[]'::jsonb)) from public.grades g),
  'grammarPlan', (select jsonb_object_agg(g.code, coalesce((
      select jsonb_agg(jsonb_build_array(p.topic_key, p.term) order by p.sort)
      from public.grammar_plan p where p.grade = g.code), '[]'::jsonb)) from public.grades g),
  'gradeVerbs', (select jsonb_object_agg(g.code, coalesce((
      select jsonb_agg(v.verb order by v.sort) from public.grade_verbs v where v.grade = g.code), '[]'::jsonb))
    from public.grades g),
  'stageOfGrade', (select jsonb_object_agg(code, stage) from public.grades),
  'verbs', (select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('en', en, 'past', past, 'ar', ar, 'obj', obj, 'g', tag)) order by sort)
    from public.verbs),
  'adjPairs', (select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('en', en, 'ar', ar, 'opp', opp, 'oppAr', opp_ar, 'g', tag)) order by sort)
    from public.adjective_pairs),
  'posWords', (select jsonb_object_agg(p.pos, coalesce((
      select jsonb_agg(w.word order by w.sort) from public.pos_words w where w.pos = p.pos), '[]'::jsonb))
    from (values ('v'), ('a'), ('x')) p (pos)),
  'synonyms', (select jsonb_object_agg(en, syn) from public.synonyms),
  'adjDocs', (select jsonb_agg(jsonb_build_object('en', en, 'syn', to_jsonb(synonyms), 'ant', to_jsonb(antonyms)) order by sort)
    from public.adjective_docs),
  'adjTopics', (select jsonb_agg(jsonb_build_array(name_en, name_ar, emoji, term, array_to_string(words, ',')) order by sort)
    from public.adjective_topics),
  'jobTopicWords', (select jsonb_object_agg(s.k, coalesce((
      select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('en', j.en, 'ar', j.ar, 'e', j.emoji)) order by j.sort)
      from public.job_words j where j.set_key = s.k), '[]'::jsonb))
    from (values ('family'), ('jobs')) s (k)),
  'sentences', (select jsonb_agg(jsonb_build_object('j', job, 'p', place, 'pp', place_phrase, 't', to_jsonb(tools),
      'a', action, 'rest', full_text, 'b', blanked_text) order by sort) from public.job_sentences),
  'comparatives', (select jsonb_agg(jsonb_build_array(a, b) order by sort) from public.word_pairs where kind = 'comparative'),
  'plurals', (select jsonb_agg(jsonb_build_array(a, b) order by sort) from public.word_pairs where kind = 'plural'),
  'timeMarkers', (select jsonb_agg(jsonb_build_array(a, b) order by sort) from public.word_pairs where kind = 'time_marker'),
  'edSounds', (select jsonb_agg(jsonb_build_array(a, b) order by sort) from public.word_pairs where kind = 'ed_sound'),
  'sSounds', (select jsonb_agg(jsonb_build_array(a, b) order by sort) from public.word_pairs where kind = 's_sound'),
  'prepositions', (select jsonb_agg(jsonb_build_array(sentence, answer, ar) order by sort) from public.prepositions),
  'modalHints', (select jsonb_object_agg(key, jsonb_build_array(en, ar)) from public.hints where kind = 'modal'),
  'linkHints', (select jsonb_object_agg(key, jsonb_build_array(en, ar)) from public.hints where kind = 'link'),
  'causeHints', (select jsonb_object_agg(key, jsonb_build_array(en, ar)) from public.hints where kind = 'cause'),
  'badVerbs', (select jsonb_object_agg(tense, verbs) from (
      select tense, jsonb_agg(verb order by sort) verbs from public.bad_verbs group by tense) b),
  'banks', (select jsonb_object_agg(b.bank, coalesce((
      select jsonb_agg(case when q.hint_key is null then jsonb_build_array(q.question, q.answer, to_jsonb(q.wrong))
                            else jsonb_build_array(q.question, q.answer, to_jsonb(q.wrong), q.hint_key) end order by q.sort)
      from public.question_bank q where q.bank = b.bank), '[]'::jsonb))
    from (values ('modal'), ('link'), ('cond'), ('passive'), ('usedTo'), ('equality'), ('passivePast'), ('whenWhile'),
      ('cause'), ('presentPerfectAdv'), ('prefix'), ('imperative'), ('cond1'), ('obligation'), ('punctuation'), ('wordForm')) b (bank)),
  'dialogues', (select jsonb_agg(jsonb_build_array(question, answer, to_jsonb(wrong)) order by sort) from public.dialogues),
  'reading', (select jsonb_object_agg(s.stage, coalesce((
      select jsonb_agg(jsonb_build_array(t.body, coalesce((
          select jsonb_agg(jsonb_build_array(q.question, q.answer, to_jsonb(q.wrong)) order by q.sort)
          from public.reading_questions q where q.text_id = t.id), '[]'::jsonb)) order by t.sort)
      from public.reading_texts t where t.kind = 'reading' and t.stage = s.stage), '[]'::jsonb))
    from (values ('P'), ('M'), ('S')) s (stage)),
  'bemReading', (select jsonb_agg(jsonb_build_array(t.body, coalesce((
        select jsonb_agg(jsonb_build_array(q.question, q.answer, q.evidence) order by q.sort)
        from public.reading_questions q where q.text_id = t.id), '[]'::jsonb)) order by t.sort)
    from public.reading_texts t where t.kind = 'bem'),
  'primSentences', (select jsonb_agg(body order by sort) from public.example_sentences where kind = 'prim'),
  'midSentences', (select jsonb_agg(body order by sort) from public.example_sentences where kind = 'mid'),
  'secSentences', (select jsonb_agg(body order by sort) from public.example_sentences where kind = 'sec'),
  'bemSentences', (select jsonb_agg(body order by sort) from public.example_sentences where kind = 'bem'),
  'topicNames', (select jsonb_object_agg(key, jsonb_build_array(name_en, name_ar, emoji)) from public.grammar_topics),
  'schoolLevels', (select jsonb_agg(jsonb_build_array(label_en, label_ar, key, emoji) order by sort)
    from public.levels where path = 'school'),
  'generalLevels', (select jsonb_agg(jsonb_build_array(label_en, label_ar, key, emoji) order by sort)
    from public.levels where path = 'general'),
  'generalToGrades', (select jsonb_object_agg(level_key, grades) from (
      select level_key, jsonb_agg(grade order by sort) grades from public.level_grades group by level_key) lg),
  'sequences', (select jsonb_object_agg(grade, titles) from (
      select grade, jsonb_agg(jsonb_build_array(title_en, title_ar) order by term) titles from public.sequences group by grade) s)
);
$$;

grant execute on function public.get_content() to anon, authenticated;
