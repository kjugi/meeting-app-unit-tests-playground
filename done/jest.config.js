module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ]
}
