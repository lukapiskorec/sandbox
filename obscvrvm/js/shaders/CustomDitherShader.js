const int bayer_n = 4;
float bayer_matrix_4x4[][bayer_n] = {
    {    -0.5,       0,  -0.375,   0.125 },
    {    0.25,   -0.25,   0.375, - 0.125 },
    { -0.3125,  0.1875, -0.4375,  0.0625 },
    {  0.4375, -0.0625,  0.3125, -0.1875 },
};


for (int sy = 0; sy < viewport.height; sy++) {
        float orig_color = get_screen_gradient(sy);
        for (int sx = 0; sx < viewport.width; sx++) {
            int color_result = BLACK;
            float bayer_value = bayer_matrix_4x4[sy % bayer_n][sx % bayer_n];
            float output_color = orig_color + (bayer_r * bayer_value);
            // Color screen blue to white
            if (output_color < (NUM_VALUES / 2)) {
                color_result = WHITE;
            }
            *PIXEL_PTR((&screen), sx, sy, 1) = color_result;
        }
    }
