import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ivkcbxqqzavfqowwucrp.supabase.co'
const SUPABASE_KEY = 'sb_publishable_BNp9aAbVIZ2eNAVx08AWlg_aq9RqjR2'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
