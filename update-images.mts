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

const updates = [
    { id: '3271b518-0155-45e5-b56b-f1d5211388cc', image_url: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?auto=format&fit=crop&q=80&w=1080' }, // Medical Oxygen
    { id: 'ed1d7df6-23f0-47e2-a0d7-5431a30bdefa', image_url: 'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?auto=format&fit=crop&q=80&w=1080' }, // CNC Lathe
    { id: '8f6d95d2-f516-4451-848b-4d8d8ee8f3ae', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop' }, // Smartphone (placeholder was okay, but let's re-verify)
    { id: '4c207165-0913-4026-bd5b-9c056e19d9f8', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' }, // Excavator
    { id: '49272b0a-8403-454f-acb6-21e2bf304112', image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop' }, // T-shirts
    { id: 'eb571803-56d3-4f00-9477-43604cc351db', image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop' }, // LED TV
    { id: '084cc025-1bd6-4e7e-9005-ec5f681045ca', image_url: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=800&auto=format&fit=crop' }, // Silk Fabric
]

async function run() {
    for (const update of updates) {
        const { error } = await supabase
            .from('products')
            .update({ image_url: update.image_url })
            .eq('id', update.id)

        if (error) {
            console.error(`Error updating ID ${update.id}:`, error)
        } else {
            console.log(`Updated ID ${update.id}`)
        }
    }
}

run()
