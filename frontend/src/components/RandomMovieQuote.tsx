import React, {useEffect, useState } from 'react'

interface RandomMovieQuoteProps {
  count: number
}

interface QuoteData {
  movieName: string,
  quote: string
}

export default function RandomMovieQuote({ count }: RandomMovieQuoteProps) {
  const [randomQuotes, setRandomQuotes] = useState<QuoteData[]>([]);
  useEffect(() => {
    fetch(`http://localhost:3001/quotes/${count}`)
      .then(response => response.json())
      .then(data => setRandomQuotes(data));
  }, []);


  return (
    <div>
      <h2>Random Movie Quotes</h2>
      <div>
        {randomQuotes.map((quote, index) => (
          <div key={index} style={{ marginTop: '20px'}}>
            <div>{quote.movieName}</div>
            <div><i>{quote.quote}</i></div>
          </div>
        ))}
      </div>
    </div>
  )
}
