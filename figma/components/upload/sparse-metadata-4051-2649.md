# Figma — Upload (`4051:2649`) — sparse metadata

```xml
<frame id="4051:2649" name="Upload" x="3727" y="-59" width="1824" height="1833">

  <!-- Bloco 1: Upload button (1584x377) -->
  <frame id="4051:3034" name="Component">
    <frame id="4051:3071" name="upload">
      <!-- Matriz size × file × variant -->
      <symbol id="4062:4286" name="size=m, file=no, variant=no file" /> <!-- 320x63 -->
      <symbol id="4062:4356" name="size=l, file=no, variant=no file" /> <!-- 320x67 -->
      <symbol id="4700:13381" name="size=l, file=yes, variant=vertical" /> <!-- 320x99 -->
      <symbol id="4809:12126" name="size=l, file=yes, variant=horizontal" /> <!-- 320x67 -->
      <symbol id="4062:4692" name="size=s, file=no, variant=no file" /> <!-- 320x59 -->
      <symbol id="4700:13414" name="size=s, file=yes, variant=vertical" /> <!-- 320x91 -->
      <symbol id="4809:12136" name="size=s, file=yes, variant=horizontal" /> <!-- 320x59 -->
      <symbol id="4062:4804" name="size=xs, file=no, variant=no file" /> <!-- 320x51 -->
      <symbol id="4700:13418" name="size=xs, file=yes, variant=vertical" /> <!-- 320x83 -->
      <symbol id="4809:12146" name="size=xs, file=yes, variant=horizontal" /> <!-- 320x51 -->
      <symbol id="4062:4280" name="size=m, file=yes, variant=vertical" /> <!-- 320x95 -->
      <symbol id="4809:12116" name="size=m, file=yes, variant=horizontal" /> <!-- 320x63 -->
    </frame>
  </frame>

  <!-- Bloco 2: Input file (875x356) -->
  <frame id="4700:12604" name="Component">
    <frame id="4700:12484" name="input file">
      <!-- Matriz type × state -->
      <symbol id="4700:12483" name="type=upload, state=default" />
      <symbol id="4700:12594" name="type=upload, state=disabled" />
      <symbol id="4700:12564" name="type=upload, state=error" />
      <symbol id="4700:12574" name="type=upload, state=error focus" />
      <symbol id="4700:12544" name="type=upload, state=focus" />
      <symbol id="4700:12485" name="type=file, state=default" />
      <symbol id="4956:13438" name="type=file, state=loading" />
      <symbol id="4953:13412" name="type=file, state=disabled" />
      <symbol id="4700:12568" name="type=file, state=error" />
      <symbol id="4953:13404" name="type=file, state=error focus" />
      <symbol id="4700:12548" name="type=file, state=focus" />
    </frame>
  </frame>

  <!-- Exemplos 4137:12517 com 5 instances de upload -->
  <!-- Tooltip support 8735:13768: upload 320x63 + tooltip 200x44 -->
</frame>
```

## Sub-nodes para drill posterior
- 4051:3071 (upload button matrix, 12 variants size×file×variant)
- 4700:12484 (input file matrix, 11 variants type×state)

## Sections meta
- Sizes: Regular (m), Large (l), Small (s), Mini (xs)
- File: no file / with file vertical / with file horizontal
- States: Default, Focus, Error, Error Focus, Disabled, Loading
