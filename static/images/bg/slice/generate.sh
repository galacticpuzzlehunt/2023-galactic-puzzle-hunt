#!/bin/bash
# Note: this script might not work for inane policy reasons...
for filename in ../*.png; do
  identify -format '%w %h' $filename | (
    read width height
    if [ $width -gt $height ]; then exit; fi
    basename=$(basename $filename .png)
    echo $basename
    convert $filename -crop ${width}x$(($width / 2)) "$basename.%02d.png"
  )
done
