import { CookieOptions } from "express";

export const cookieOptions:CookieOptions = {
    expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
    sameSite: 'strict',
    httpOnly: true,
}