import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("env keys not configured");
}

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const signUpWithEmail = async (email: string, username: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true,
            emailRedirectTo: 'https://bookish-tribble-7q5gv64xgvpcx9jr-3000.app.github.dev/onboarding',
            data: {
                username
            }
        }
    })
}

export const signInWithEmail = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: false,
            emailRedirectTo: 'https://bookish-tribble-7q5gv64xgvpcx9jr-3000.app.github.dev/onboarding'
        }
    })
}

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
    })
}