class OAuthClient {
  constructor(config) {
    if (!config) {
      throw new Error('OAuthClient requires a config object')
    }

    this.config = config
    this.token = null
    this.expirationTime = 0
    this._refreshPromise = null
  }

  getToken() {
    return this.token
  }

  isExpired() {
    return Date.now() > this.expirationTime
  }

  async refreshAccessToken() {
    // Dedupe concurrent refreshes so parallel requests share one token call.
    if (this._refreshPromise) {
      return this._refreshPromise
    }

    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    })

    this._refreshPromise = (async () => {
      try {
        const response = await fetch(this.config.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data.toString(),
        })

        if (!response.ok) {
          console.error(`Failed to retrieve access token: ${response.status}`)
          return
        }

        const json = await response.json()
        this.token = json.access_token
        this.expirationTime = Date.now() + json.expires_in * 1000
      } catch (error) {
        console.error(`Failed to retrieve access token due to exception: ${error.message}`)
      } finally {
        this._refreshPromise = null
      }
    })()

    return this._refreshPromise
  }

  async getValidToken() {
    if (this.isExpired()) {
      await this.refreshAccessToken()
    }
    return this.token
  }
}

/*
 * Singleton instance holder.
 * The host application is responsible for calling configureOAuthClient() at
 * startup with credentials sourced from wherever it sees fit (env vars,
 * runtime config, user input, etc.). The library itself does not read any
 * build-time env vars, so it stays bundler-agnostic.
*/

let oAuthClientInstance = null

export function configureOAuthClient(config) {
  if (!config || !config.clientId || !config.clientSecret || !config.tokenEndpoint) {
    console.warn('configureOAuthClient called without complete config; OAuth disabled.')
    return null
  }
  oAuthClientInstance = new OAuthClient(config)
  return oAuthClientInstance
}

export function getOAuthClient() {
  return oAuthClientInstance
}

export function resetOAuthClient() {
  oAuthClientInstance = null
}
