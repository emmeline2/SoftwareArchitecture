# Project Setup Helpers

### Prerequisites
1. Make sure you have a recent version of node installed
2. Make sure you have yarn installed


### Basic Vue Scaffold
To get the basic vue scaffold started, execute the command:

Note I prefer using the yarn package manager...
```
yarn create vue
```

If you want to use npm:
```
npm create vue@3
```

Follow the prompts and put in whatever values you want, but make sure you hit "YES" for adding typescript support, JSX support, Pinia for state manamgent, and the Vue Router. 

Follow the directions to make sure your initial project compiles and can be started.

If you are using VSCode make sure you have the "Volar" plugin installed.

### Quasar Vue Scaffold (fancy)
For this option we will use the Quasar framework which has a lot of nice out of the box UI widgets

First install the quasar cli tool:

```
yarn global add @quasar/cli
```

Now scaffold the basic project

```
yarn create quasar
```
Make sure you pick typescript, Vite as the CLI variant, Composition API (with script setup), State with Pinia, Axios.


