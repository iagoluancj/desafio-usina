import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ocjgmvegmuvtxuzsipuy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jamdtdmVnbXV2dHh1enNpcHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MTQ5MDcsImV4cCI6MjA0NTk5MDkwN30.kajI0smemDImkMyJQCln831Fu4AZTsDX5bq6FYERhLo'

export const supabase = createClient(supabaseUrl!, supabaseKey!)
