import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    const { data: products, error } = await supabase
        .from('products')
        .select('id, name, is_active')
        .limit(5)

    if (error) {
        console.error('Error fetching products:', error)
    } else {
        console.log('Products:', JSON.stringify(products, null, 2))
    }

    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id, name')
        .limit(5)

    if (catError) {
        console.error('Error fetching categories:', catError)
    } else {
        console.log('Categories:', JSON.stringify(categories, null, 2))
    }
}

test()
