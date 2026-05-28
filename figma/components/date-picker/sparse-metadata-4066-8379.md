# Figma — Date picker (`4066:8379`) — sparse metadata

> Frame é grande demais (1068x4295). Retornou metadata estrutural. Para extrair código completo de cada sub-componente, drillar nos node-ids abaixo.

```xml
<frame id="4066:8379" name="Date picker" x="11067" y="-59" width="1068" height="4295">
  <instance id="4066:8380" name="Page header" />
  <frame id="4066:8381" name="Content container" width="1068" height="4064">

    <!-- Bloco 1: Date picker calendar (572x605) -->
    <frame id="4066:4594" name="Component">
      <frame id="4066:4604" name="date picker">
        <symbol id="4066:4605" name="months=1 month" /> <!-- 224x245 -->
        <symbol id="4066:4656" name="months=2 months" /> <!-- 464x245 -->
      </frame>
    </frame>

    <!-- Bloco 2: Date picker header (742x480) -->
    <frame id="4066:4936" name="Component">
      <frame id="4066:4959" name=".date picker / header">
        <symbol id="4066:4960" name="type=1 month, editable?=False" />
        <symbol id="4066:4964" name="type=2 months, editable?=False" />
        <symbol id="4066:4975" name="type=year and month, editable?=True" />
        <symbol id="4066:4981" name="type=only month, editable?=True" />
        <symbol id="4066:4987" name="type=only year, editable?=True" />
      </frame>
    </frame>

    <!-- Bloco 3: Date picker day cell (406x349) -->
    <frame id="4066:4995" name="Component">
      <frame id="4066:5017" name=".date picker / day">
        <!-- position × state matrix; 24 sub-symbols -->
        <symbol id="4066:5018" name="position=middle, state=disabled" />
        <symbol id="4066:5020" name="position=middle, state=active" />
        <symbol id="4066:5022" name="position=left, state=active" />
        <symbol id="4066:5024" name="position=single, state=active" />
        <symbol id="4066:5026" name="position=right, state=active" />
        <symbol id="4066:5028" name="position=middle, state=selected" />
        <symbol id="4066:5030" name="position=left, state=selected" />
        <symbol id="4066:5032" name="position=single, state=selected" />
        <symbol id="4066:5034" name="position=right, state=selected" />
        <symbol id="4066:5036" name="position=middle, state=default" />
        <!-- 14 more variants for position × state remaining -->
      </frame>
    </frame>

    <symbol id="4066:5040" name=".date picker / weekday mame" /> <!-- 32x32 -->

    <!-- Bloco 4: Date picker input (576x261) -->
    <frame id="4115:12916" name="Component">
      <frame id="4115:12926" name="date picker input">
        <symbol id="4785:11494" name="state=placeholder, variant=default" />
        <symbol id="4785:11496" name="state=value, variant=default" />
        <symbol id="4785:11498" name="state=focus, variant=default" />
        <symbol id="4115:12927" name="state=placeholder, variant=range" />
        <symbol id="4115:12929" name="state=value, variant=range" />
        <symbol id="4115:12931" name="state=focus, variant=range" />
      </frame>
    </frame>

    <!-- Exemplos com menu/combobox -->
    <frame id="4140:15095" name="Frame 314528">
      <frame id="4140:15096" name="Select Example"> <!-- 256x309: date picker input + menu/combobox -->
      <frame id="8085:9331" name="Select Example"> <!-- 256x349 -->
      <frame id="4140:15099" name="Select Example"> <!-- 496x309 (range) -->
    </frame>

    <!-- Tooltip support -->
    <frame id="8735:14149" name="Frame 314561">
      <frame id="8735:14048" name="Row"> <!-- 210x85: input + tooltip 200x44 -->
      <frame id="8735:14131" name="Row"> <!-- 496x309: range + tooltip -->
    </frame>
  </frame>
</frame>
```

## Sub-nodes para drill posterior
- 4066:4605 (1 month calendar)
- 4066:4656 (2 months calendar)
- 4066:4959 + 5 headers (4066:4960/4964/4975/4981/4987)
- 4066:5017 (day cell matrix com 24+ variants)
- 4115:12926 (input matrix com 6 variants)
- menu/combobox referência 4132:13504
