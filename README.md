# UrbanCompanyApp

A cross-platform home-services booking app built with React Native and Expo, inspired by the Urban Company experience — browse service categories, view details, book a slot, and check out.

## Features

- **Home & categories** — browse services grouped by category with a search-friendly home screen
- **Service details** — pricing, description, and add-to-cart flow for each service
- **Cart & checkout** — cart, saved addresses, slot selection, and payment screens
- **Order tracking** — order confirmation and order history
- **Auth flow** — sign-in/sign-up screens
- **State management** — global state handled with [Zustand](https://github.com/pmndrs/zustand) stores for auth, cart, addresses, and orders

## Tech stack

- React Native + [Expo](https://expo.dev) (SDK 57)
- TypeScript
- React Navigation (native-stack + bottom-tabs)
- Zustand for state management
- Custom fonts via `expo-font` (Poppins, Playfair Display)

## Getting started

```bash
npm install
npm start        # opens Expo dev tools
npm run android   # run on Android
npm run ios       # run on iOS
npm run web       # run in browser
```

Requires [Expo Go](https://expo.dev/go) on a physical device, or an Android/iOS simulator.

## Project structure

```
src/
  components/   Reusable UI components
  data/         Static/mock data for services and categories
  navigation/   Stack & tab navigators
  screens/      auth, home, booking, orders, profile
  store/        Zustand stores
  theme/        Colors, typography, spacing
  types/        Shared TypeScript types
```
