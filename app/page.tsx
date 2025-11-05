'use client'

import { useState, useEffect } from 'react'

interface WashingMachine {
  name: string
  price: number
  site: string
  url: string
  image?: string
}

export default function Home() {
  const [machines, setMachines] = useState<WashingMachine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMachines()
  }, [])

  const fetchMachines = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/search')
      if (!response.ok) {
        throw new Error('Failed to fetch washing machines')
      }
      const data = await response.json()
      setMachines(data.machines || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '10px', fontWeight: '700' }}>
            🧺 9kg IWF Washing Machine Finder
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
            Discover the best prices across Indian e-commerce platforms
          </p>
        </header>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '5px solid rgba(255,255,255,0.3)',
              borderTop: '5px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: 'white', marginTop: '20px', fontSize: '1.1rem' }}>
              Searching across multiple e-commerce sites...
            </p>
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <strong>Error:</strong> {error}
            <button
              onClick={fetchMachines}
              style={{
                marginLeft: '20px',
                padding: '8px 16px',
                background: 'white',
                color: '#dc2626',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && machines.length === 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              No washing machines found. Try refreshing the page.
            </p>
          </div>
        )}

        {!loading && machines.length > 0 && (
          <>
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>
                💰 Cheapest Option
              </h2>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981', margin: 0 }}>
                {formatPrice(machines[0].price)}
              </p>
              <p style={{ color: '#666', marginTop: '5px' }}>
                {machines[0].name}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {machines.map((machine, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => window.open(machine.url, '_blank')}
                >
                  {machine.image && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      background: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={machine.image}
                        alt={machine.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      display: 'inline-block',
                      background: '#e0e7ff',
                      color: '#4f46e5',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      marginBottom: '10px'
                    }}>
                      {machine.site}
                    </div>
                    <h3 style={{
                      margin: '10px 0',
                      fontSize: '1rem',
                      color: '#333',
                      lineHeight: '1.4',
                      height: '3.6em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {machine.name}
                    </h3>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#10b981',
                      marginTop: '10px'
                    }}>
                      {formatPrice(machine.price)}
                    </div>
                    <button
                      style={{
                        marginTop: '15px',
                        width: '100%',
                        padding: '12px',
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#5568d3'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#667eea'}
                    >
                      View on {machine.site}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <footer style={{ textAlign: 'center', marginTop: '40px', color: 'rgba(255,255,255,0.8)' }}>
          <p>Prices updated in real-time from major Indian e-commerce platforms</p>
        </footer>
      </div>
    </div>
  )
}
