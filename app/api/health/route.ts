import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AI Token Calculator',
    timestamp: new Date().toISOString(),
    message: 'This is a legitimate web application for calculating AI model tokens',
    purpose: 'Educational and utility service',
    security: {
      malware: false,
      phishing: false,
      tracking: false,
      ads: false,
      dataCollection: false
    },
    contact: 'support@aitokencalculator.com'
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'X-Robots-Tag': 'index, follow'
    }
  });
}