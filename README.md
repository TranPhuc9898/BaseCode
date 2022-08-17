# Mini-App bTaskee with React Native

## Features

Mini App - bTaskee

## Stack

- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [React Native](https://reactnative.dev/) - ReactJS-based framework that can use native platform capabilities
- [React Navigation(v6)](https://reactnavigation.org/) - Routing and navigation
- [Restyle](https://github.com/Shopify/restyle) - A type-enforced system for building UI components
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
- [React Native SVG](https://github.com/react-native-svg/react-native-svg) - Displaying SVG images
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Free Icons
- [React Native Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet) - A performant interactive bottom sheet with fully configurable options
- [jotai](https://jotai.org/) - Primitive and flexible state management for React

## Project structure

```
$PROJECT_ROOT
├── e2e
    ├─ config # Config to run
    ├─ firstTest # To run Auto Test
    ├─ environment # Set up env
├── src
    ├── app.ts       # Entry point
└── src
    ├── BottomMenu.tsx   # Navigation components
    ├── components # UI components
    ├── screens    # Screen components
    ├── hooks      # hooks
    ├── redux       # save state storage
    ├── utils       # sample data
    └── assets     # Image files
```

## How to dev

```sh
yarn && cd ios && pod install && cd .. && yarn ios
```

## Or

```sh
|yarn damn| to run
```

## License

Apache-2.0

---

Looking for a note of this app? Check out my notion:

## Link

[https://wave-slime-2cb.notion.site/bTaskee-New-Job-ef2e46af1bdc403582721b2810626987]

## Detox Testing Automatin

```sh
1. Huong dan chay don gian
https://blog.mimacom.com/e2e-testing-in-rn-with-detox/

2. Huong dan su dung
https://wix.github.io/Detox/docs/introduction/getting-started
```
