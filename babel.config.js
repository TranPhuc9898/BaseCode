module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src'
        }
      },
      ['@babel/plugin-proposal-class-properties', { loose: false }]
    ],
    'react-native-reanimated/plugin'
  ]
}
