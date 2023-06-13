//////COLOR PALETTES//////


const palette_pigments = {

  "horizon, sunshine, grapefruit": {

  "Otti":             ["#a3d3ff", "#fefaee", "#ff855f", "#ffe550"], // light blue, white, light red, yellow - Otti Berger
  "Stölzl":           ["#c44414", "#daa211", "#255080", "#e7e7d7"], // red, yellow, blue, white - Gunta Stölzl
  "Albers":           ["#f9f0df", "#e51335", "#2a72ae", "#fbb515"], // white, red, blue, yellow - Anni Albers
  "Brandt":           ["#3bb3ff", "#feeddd", "#ffbb33", "#ff2244"], // light blue, white, orange, red - Marianne Brandt
  "Koch-Otte":        ["#ee5626", "#eebb22", "#4d9db9", "#f5f5d5", "#7cc1c1"], // red, yellow, blue, white, light blue - Benita Koch-Otte
  "Arndt":            ["#e22e82", "#efbf33", "#3555a5", "#e7e7d7"], // red, yellow, blue, white - Gertrude Arndt
  "Siedhoff-Buscher": ["#ebb707", "#e84818", "#266396", "#eecece", "#e4e4e4"], // yellow, red, blue, light lila, white - Alma Siedhoff-Buscher
  "Heymann":          ["#ee2f2f", "#f2cd22", "#1b94bb", "#faaaba", "#feeede"], // red, yellow, blue, light pink, white - Margarete Heymann
  
  },

  "night, embers, citrus": {
  
  "van der Rohe": ["#f34333", "#fdd666", "#275777", "#f3f3f3", "#090909"], // - Ludwig Mies van der Rohe
  "Breuer":       ["#ffbf0b", "#ee3e6e", "#2277a7", "#f9f0df", "#090909"], // - Marcel Breuer
  "Gropius":      ["#f9f0df", "#e51335", "#2a72ae", "#fbb515", "#090909"], // white, red, blue, yellow, black - Walter Gropius
  "Le Corbusier": ["#f24222", "#fccc0c", "#4888c8", "#f9f0df", "#090909"], // red, yellow, blue, white, black - Le Corbusier
  
  },

  "ivy, apatite, tourmaline": {
  
  "O'Keeffe":   ["#0e4a4e", "#ff9777", "#ead2a2", "#5484a8"], // green, light red, beige, blue - Georgia O'Keeffe
  "Dalí":       ["#e54545", "#f77757", "#fccc66", "#fafa66", "#1ac1ca"], // - Salvador Dalí
  "Matisse":    ["#06add6", "#066888", "#f0cc0c", "#fff1d1", "#dd1d1d"], // - Henri Matisse
  "Kandinsky":  ["#ffbf0b", "#ee3e6e", "#2277a7", "#33936d", "#f9f0df"], // - Wassily Kandinsky
  "Chagall":    ["#f6af06", "#1e66aa", "#eee7d7", "#019166", "#e74422"], // orange yellow, blue, white, green, red - Marc Chagall
  "Negreiros":  ["#f8c8de", "#f2e222", "#28b2d2", "#668833", "#ef6e7e"], // light pink, yellow, blue, green, red - Almada Negreiros
  "Picasso":    ["#f33373", "#eed333", "#445e7e", "#19a199", "#ede8dd"], // red, yellow, blue, teal, white - Pablo Picasso
  "Klee":       ["#de3e1e", "#de9333", "#007555", "#eccdad", "#889979"], // red, yellow, green, white, olive green - Paul Klee
  
  },

  "sodalite, glacier, rust": {
  
  "Planck":     ["#f8f8e8", "#d83818", "#224772", "#151a1a"], // white, red, blue, black - Max Planck
  "Thomson":    ["#144b5b", "#088191", "#e5fde5", "#466994", "#f55b66"], // - Sir Joseph John Thomson
  "Einstein":   ["#ebe0ce", "#c5c5bb", "#242d44", "#e4042e"], // light gray, gray, dark blue, red - Albert Einstein
  "Heisenberg": ["#f9f9f0", "#e11e21", "#e7007e", "#005aa5", "#5ec5ee"], // white, red, pink, blue, light blue - Werner Heisenberg
  "Bohr":       ["#f999a9", "#044499", "#1a88c1", "#77aee7", "#f9f9f0"], // light pink, blue, light blue, super light blue, white - Niels Bohr
  "Feynman":    ["#004999", "#557baa", "#ff4f44", "#ffbcbc", "#fff8e8"], // deep blue, blue, red, light lila, white - Richard Feynman
  "Dirac":      ["#db4545", "#d0e0e0", "#3a6a93", "#2e3855", "#a3c6d3"], // red, white, blue, dark blue, light blue - Paul Dirac
  
  },

  "ocean, lapis, sulphur": {
  
  "Babbage":  ["#244888", "#2277d7", "#62aad6", "#f2d552"], // - Charles Babbage
  "Lovelace": ["#dafaff", "#00bbfb", "#005995", "#002044"], // - Ada Lovelace
  "Leibniz":  ["#fff8f8", "#a3e3dd", "#1c6dd6", "#2c2c44", "#ffd525"], // white, light teal, blue, dark gray, yellow - Gottfried Wilhelm Leibniz
  "Boole":    ["#070c0c", "#1d5581", "#fece3c", "#f8e288", "#9fc999"], // - George Boole
  
  },

  "moss, cedar, algae": {
  
  "Zancan":  ["#445522", "#788c33", "#b5be5e", "#242414", "#f2f2f2"], // - Zancan
  "Muir":    ["#cec09c", "#505e3e", "#374727", "#2a3322"], // light brown, light olive, dark green, dark olive - John Muir
  "Thoreau": ["#144b5b", "#1a966a", "#88d899", "#cadaba", "#f9e9d9"], // - Henry David Thoreau
  
  },

  "ink, papyrus, marble": {
  
  "McCullin":   ["#cac5b5", "#ebe0ce", "#f9f0df", "#fff8f8"], // gray, light gray, white, white - Donald McCullin
  "Adams":      ["#ebe0ce", "#ebe0ce", "#2a2b2c", "#1e1e1e"], // light gray, dark gray, black - Ansel Adams
  "Becher":     ["#ebe0ce", "#ebe0ce", "#cac5b5", "#1e1e1e"], // light gray, gray, black - Bernd and Hilla Becher
  "Hokusai":    ["#7d9aa7", "#ddd4c4", "#10244a", "#444b4e"], // - Katsushika Hokusai
  "Hiroshige":  ["#ebe0ce", "#20335c", "#1c2244", "#1d1f2d"], // light gray, blue, dark blue, black - Utagawa Hiroshige
  
  },

  "murex, rhodochrosite, marshmallow": {
  
  "Minsky":      ["#c5e5f5", "#fd5d9d", "#fccce0", "#feefef"], // - Marvin Minsky
  "Simon":       ["#1f336f", "#8b3b7b", "#f7447f", "#f9f0df"], // - Herbert A. Simon
  "McCarthy":    ["#3fb3aa", "#7cc7ac", "#dadaaa", "#fe9e9e", "#ff3f7f"], // - John McCarthy
  "Solomonoff":  ["#e77e99", "#6cc6dd", "#866686", "#f9f9f0"], // light pink, light blue, light purple, white - Ray Solomonoff
  "Shannon":     ["#665d8d", "#7799aa", "#d885a5", "#fccebb"], // purple, teal, pink, beige - Claude Shannon
  "Turing":      ["#e40422", "#e33388", "#434394", "#191919", "#ece3d3"], // red, pink, blue, black, white - Alan Turing
  
  },

  "furnace, ruby, soot": {
  
  "Kapoor":   ["#900f3f", "#ff5333", "#ffcc00", "#f9f0df"], // maroon, orange, yellow, white - Anish Kapoor
  "Golid":    ["#fece44", "#ede8dd", "#ff5333", "#ff99b9"], // yellow, white, red, light pink - Kjetil Golid
  "Busia":    ["#f9f0df", "#f9f0df", "#e51335", "#090909"], // white, white, red, black - Kwame Bruce Busia
  "Judd":     ["#e11e21", "#faaf0f", "#ff855f", "#191919"], // red, orange yellow, light red, black - Donald Judd
  "Malevich": ["#ece3d3", "#e51335", "#1d1d1d", "#fcc1c1"], // light gray, red, black, light pink - Kazimir Malevich

  }
}