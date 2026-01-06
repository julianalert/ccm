import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.trim().toLowerCase()

    if (!query || query.length < 1) {
      return NextResponse.json({ data: [] })
    }

    const supabase = createServerClient()

    // Search in name, symbol, and slug (case-insensitive)
    // Use ilike with pattern matching - % for wildcard
    const searchPattern = `%${query}%`
    const { data, error } = await supabase
      .from('cryptocurrencies')
      .select('id, name, symbol, slug, logo')
      .or(`name.ilike.${searchPattern},symbol.ilike.${searchPattern},slug.ilike.${searchPattern}`)
      .order('cmc_rank', { ascending: true, nullsFirst: false })
      .limit(10)

    if (error) {
      console.error('Error searching cryptocurrencies:', error)
      return NextResponse.json(
        { error: 'Failed to search cryptocurrencies' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data || [] })
  } catch (error) {
    console.error('Error in search route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

