type Location = {
  query: string
  status: "success" | "fail"
  continent: string
  continentCode: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  district: string
  zip: string
  lat: number
  lon: number
  timezone: string
  offset: number
  currency: string
  isp: string
  org: string
  as: string
  asname: string
  mobile: boolean
  proxy: boolean
  hosting: boolean
}

export async function getIpLocation(ip: string): Promise<Location> {
  const response = await fetch(`http://ip-api.com/json/${ip}`)

  if (!response.ok) {
    throw new Error("Failed to fetch IP location")
  }

  const data = (await response.json()) as Location

  return data
}
