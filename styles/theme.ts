export const colors = {
  dark: {
    primary: "#212529",
    secondary: "#495057",
    lightGrey: "#DEE2E6",
    grey: "#ADB5BD",
  },
  blue: {
    primary: "#0096C7",
  },
  offWhite: "#F8F9FA",
  white: "#FFFFFF",
};

// atm this have to be manually set,
// typescript 4.1 may help when released
// https://www.typescriptlang.org/play?ts=4.1.0-pr-40336-8#code/MYewdgzgLgBANgQzAcwK4OQUwPICMBWmwsAvDAN4CwAUDHTAG4CWmA7gHIIC2mAXBTXpCYoLgAdwmMFE49+VWsKVQmUOHxgByKACckERFEwATGCrWZNMQUpgBfG3TsAaRzCQgoAC0w7ZGgCJvJggAZV0mFADXRToIEB5glABROAgNBVsYADMQEHkYXAQdAqKAL34ARgAmAGZnGABHVAAPfgCAFgBWADYA+3s3B2phmigATzFMGAAFBG8IABUQcJ1I5BmdEDEIAB5FgD4YMkWYTBajMGMIGGg1lBgAfhgAbQBdGHk3F4BpGEiYMkLnpiLsANaYcYgbIwRYNO7rA5vfi-BoAOgxcwWy1W6022z2i1+byRNDsLyBugQoIhUJhcNuERQSIA3DQxpNpgApECRfZnC5Sa6M+7Id4NAAiAsuwoRzOOblO5xlN3eTxgYEwDF8n0V0qFqsi2R1ADEPs8TbrYrD9VdDWBjToYCb0RijTqAErmtyW5UGkXrdVy5C24WW57Bz4wAAGABJyCa7PGJUnyDy+R7JQc7NGo5rtU7+MG2dQOVMYBLPEZjAAZJBoDA4AhEKC4lBYrw3MjpsC7DtLFZMjZbHa7CZTaHwevoLB4QjEA4NAJogIHGgAegAVGZORWqyY6ygZ03562h-3jjAAh5vL5-P0AD5X5hsfxo0QSTXSN-mdSP6zWnQATxIkXjrKk6RorkIBokUOhos0LT9Ju67stQxhEIgOjTNkqBgMQTDgGYeiQIYmAABTGPuxhtsg-CVlA1aHg2s7NsQtH9gAlEWQ4lmMJEGPMFGaC+HDcJg74JJ+UgyOJaK-pYnEsjA67rjAIBggg4z8foZHkSJLCsJJ4iSN+ckKZoSkqWpvhbDoOmkUJ+miW+H6mVA8mqOolnKapZw6HZDmCUYzmGa5Unuf4PnWf5dlAA
export type Colors =
  | "dark.primary"
  | "dark.secondary"
  | "dark.lightGrey"
  | "dark.grey"
  | "blue.primary"
  | "white"
  | "offWhite";

export const theme = {
  colors,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

export type Theme = typeof theme;
export type PropsWithTheme<P> = P & { theme: Theme };
