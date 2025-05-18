import { createAuthMiddleware } from "better-auth/plugins"
import { UAParser } from "ua-parser-js"

import { getIpLocation } from "./ip-location"
import { sendNotification } from "./notifications"

export const afterAuthMiddleware = createAuthMiddleware(async (ctx) => {
  if (ctx.path.startsWith("/sign-in")) {
    const newSession = ctx.context.newSession

    if (!newSession) {
      console.error(
        `[AUTH][${ctx.path}] No new session found error`,
        newSession
      )
      return
    }

    const ip =
      (newSession.session.ipAddress !== "" &&
      newSession.session.ipAddress !== undefined
        ? newSession.session.ipAddress
        : "1.1.1.1") ?? "1.1.1.1"

    const location = await getIpLocation(ip)

    const device = UAParser(newSession.session.userAgent ?? "")

    const loginInfo = {
      date: newSession.session.createdAt,
      device: `${device.browser.name} ${device.browser.version} on ${device.os.name} ${device.os.version}`,
      location: `${location.city}, ${location.regionName}, ${location.country}`,
      ip,
    }

    await sendNotification("LOGIN", {
      user: newSession.user,
      loginInfo,
    })
  }
})
