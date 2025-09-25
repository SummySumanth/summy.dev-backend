// geo-middleware.js
const geoip = require("geoip-lite");
const crypto = require("crypto");

const APP_SALT = process.env.APP_SALT || "replace_with_strong_salt";

function hashVal(val) {
  if (!val) return null;
  return crypto
    .createHmac("sha256", APP_SALT)
    .update(String(val))
    .digest("hex");
}

function extractClientIp(req) {
  const xff = (req.headers["x-forwarded-for"] || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (xff.length) return xff[0];
  if (req.ip) return req.ip;
  if (req.connection && req.connection.remoteAddress)
    return req.connection.remoteAddress;
  if (req.socket && req.socket.remoteAddress) return req.socket.remoteAddress;
  return null;
}

function geoMiddleware(req, res, next) {
  try {
    const ip = extractClientIp(req);
    const geo = ip ? geoip.lookup(ip) : null;

    req.location = {
      ip_hash: hashVal(ip),
      ip_raw: null, // keep raw out of request object to prevent accidental logging
      country: geo?.country || null,
      region: geo?.region || null,
      city: geo?.city || null,
      timezone: geo?.timezone || null,
      ll: geo?.ll
        ? {
            lat: Number(geo.ll[0].toFixed(4)),
            lon: Number(geo.ll[1].toFixed(4)),
          }
        : null,
      provider: geo?.range ? "geoip-lite" : null, // optional
    };
  } catch (err) {
    console.error("geoMiddleware error", err);
    req.location = {};
  }
  next();
}

module.exports = geoMiddleware;
