# JS Deobfuscation
JS Deobfuscation is a Python script that deobfuscates JS code and it's time saver for you. Although it may not work with high degrees of obfuscation, it's a pretty nice tool to help you even if it's just a bit. You can see some example in the ``examples/`` folder. This idea came to me when I saw an obfuscated script on GitHub. I reversed it for sure lmao. All these examples are extracted from GitHub. There are some references in the script's header.

# Usage
```bash
~$ git clone https://github.com/quatrecentquatre-404/js-deobfuscator
~$ cd js-deobfuscator
~$ python3 main.py <source.js>
```

# Patterns

### The OSA (obfuscated strings array)
There are some patterns that can be easily exploited using RegExp to deobfuscate a code.
First of all, majore of online obfuscator declare an array at the top of the code which contain many strings. During the runtime, the code refers to this array to get some string. By example :
```js
const strings = ["fs"]
const fs = require(strings[0])
```
Can be seen as
```js
const _0x1e5f=["\x66\x73"],_0x1e6a=require(_0x1e5f[0])
```

So, first of all, the script tries to get this array to replace references by strings themselves and then it removes the array.

### The OSA shuffler (not supported yet)
The OSA shuffler is a function called just after the OSA declaration that shuffle all elements inside. Also, it's called before any reference to it, because after this process, references index aren't same than before. By example :
```js
const strings = ["fs", "./any.json"]
const fs = require(strings[0])
const anyJson = require(strings[1])
```
Can be seen as
```js
const _0x1e5f=["\x66\x73", "\x2e\x2f\x61\x6e\x79\x2e\x6a\x73\x6f\x6e"];(function(osa, ...){ /* Anonymouse function that shuffles the OSA */})(_0x1e5f, ...);const _0x1e6a=require(_0x1e5f[1]),_0x1e71=require(_0x1e5f[0]);
```
It's an arbitraty example right there, because the indexes ``0`` and ``1`` might not change. But with a huge OSA, it will be shuffled for sure.
