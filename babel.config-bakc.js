module.exports = {

  presets: [
    ['@vue/cli-plugin-babel/preset'],
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    [
      '@babel/preset-typescript'
    ]
  ],
  'plugins': ['@babel/plugin-syntax-top-level-await', "@vue/babel-plugin-jsx"]
};


