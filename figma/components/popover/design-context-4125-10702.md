# Figma — Popover (`4125:10702`) — get_design_context

Captura literal e completa do `mcp__figma-desktop__get_design_context` na página Componentes.

```tsx
const imgArrow = "../../assets/img-tooltip-arrow-light-2.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke = "../../assets/layers-2.svg";
const imgVectorStroke1 = "../../assets/bell.svg";
const imgVectorStroke2 = "../../assets/x-soft-9.svg";
const imgVectorStroke3 = "../../assets/info-soft.svg";
const imgVectorStroke4 = "../../assets/info-dark.svg";
const imgVectorStroke5 = "../../assets/x-soft-9.svg";
const imgArrow1 = "../../assets/img-tooltip-arrow-light.svg";
type SeparatorProps = {
  className?: string;
  direction?: "default" | "vertical";
};

function Separator({ className, direction = "vertical" }: SeparatorProps) {
  const isVertical = direction === "vertical";
  return (
    <div className={className || `content-stretch flex relative ${isVertical ? "h-[48px] items-start justify-center px-[2px] w-px" : "h-px items-center rounded-[2px] w-[48px]"}`} id={isVertical ? "node-4115_8707" : "node-4115_8701"}>
      {direction === "default" && <div className="bg-[var(--color\/border\/regular,#d4d4d4)] flex-[1_0_0] h-px min-w-px relative" data-node-id="4115:8702" data-name="Divider" />}
      {isVertical && <div className="bg-[var(--color\/border\/regular,#d4d4d4)] h-full relative shrink-0 w-px" data-node-id="4115:8708" data-name="Separator / Vertical" />}
    </div>
  );
}

function Slot({ className }: { className?: string }) {
  return (
    <div className={className || "border border-[#9747ff] border-dashed content-stretch flex h-[48px] items-center justify-center p-[8px] relative rounded-[8px]"} data-node-id="4066:2838" data-name=".slot">
      <p className="[word-break:break-word] font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#c89dff] text-[14px] tracking-[0.07px] whitespace-nowrap" data-node-id="4066:2837">
        Slot
      </p>
    </div>
  );
}
type PopoverProps = {
  className?: string;
  footerSlot?: React.ReactNode | null;
  headerSlot?: React.ReactNode | null;
  mainSlot?: React.ReactNode | null;
  showArrow?: boolean;
  slotNo?: "1 slot" | "2 slots" | "3 slots";
};

function Popover({ className, footerSlot = null, headerSlot = null, mainSlot = null, showArrow = false, slotNo = "1 slot" }: PopoverProps) {
  const is2SlotsOr3Slots = ["2 slots", "3 slots"].includes(slotNo);
  const is3Slots = slotNo === "3 slots";
  return (
    <div className={className || `${String.raw`bg-[var(--color\/neutral\/50,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col items-start relative rounded-[var(--radius\/xl,8px)] w-[280px] `}${is2SlotsOr3Slots ? "" : "gap-[8px]"}`} id={is3Slots ? "node-4125_10721" : slotNo === "2 slots" ? "node-4125_10718" : "node-4125_10716"}>
      {is2SlotsOr3Slots && (headerSlot || <Slot className="border border-[#9747ff] border-dashed content-stretch flex h-[40px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full" />)}
      {mainSlot || <Slot className="border border-[#9747ff] border-dashed content-stretch flex h-[40px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full" />}
      {["1 slot", "2 slots"].includes(slotNo) && showArrow && (
        <div className="absolute bottom-[-6px] h-[5px] right-[18.5px] w-[11.5px]" data-node-id="4732:11422" data-name="Arrow">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrow} />
        </div>
      )}
      {is3Slots && (footerSlot || <Slot className="border border-[#9747ff] border-dashed content-stretch flex h-[40px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full" />)}
      {is3Slots && showArrow && (
        <div className="absolute bottom-[-6px] h-[5px] right-[18.5px] w-[11.5px]" data-node-id="4732:11504" data-name="Arrow">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrow} />
        </div>
      )}
    </div>
  );
}

export default function Popover1() {
  return (
    <div className="bg-[var(--color\/neutral\/50,#fafafa)] content-stretch flex flex-col items-start relative rounded-[32px] size-full" data-node-id="4125:10702" data-name="Popover">
      <div className="bg-[var(--color\/neutral\/700,#404040)] content-stretch flex flex-col gap-[48px] items-start p-[32px] relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-node-id="4125:10703" data-name="Page header">
        <div className="h-[20px] relative shrink-0 w-[113.863px]" data-node-id="I4125:10703;4001:214" data-name="$eehd9xsz19k 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[140.53%] left-[-23.82%] max-w-none top-[-19.16%] w-[147.92%]" src={imgEehd9Xsz19K1} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="I4125:10703;4001:215" data-name="icon/title/description">
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="I4125:10703;4115:12306" data-name="icon/title">
            <div className="overflow-clip relative shrink-0 size-[40px]" data-node-id="I4125:10703;4023:1411" data-name="icon/layers-2">
              <div className="absolute inset-[4.13%_4.14%_4.14%_4.14%]" data-node-id="I4125:10703;4023:1411;4040:6835" data-name="Vector (Stroke)">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke} />
              </div>
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-px not-italic relative text-[49px] text-[color:var(--color\/neutral\/50,#fafafa)]" data-node-id="I4125:10703;4001:216">
              Popover
            </p>
          </div>
          <div className="content-stretch flex items-center justify-center pl-[56px] relative shrink-0 w-full" data-node-id="I4125:10703;4115:12565" data-name="description">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] min-w-px not-italic relative text-[20px] text-[color:var(--color\/neutral\/50,#fafafa)]" data-node-id="I4125:10703;4115:9502">
              Componente flutuante que aparece sobre o conteúdo ao clicar em um elemento, exibindo informações extras, ações ou formulários. Diferente de tooltips, suporta conteúdo mais complexo e interativo.
            </p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[64px] items-start p-[64px] relative shrink-0 w-full" data-node-id="4125:10704" data-name="Content container">
        <div className="h-[504px] relative shrink-0 w-[383px]" data-node-id="4125:10705" data-name="Component">
          <div className="absolute h-[504px] left-[55px] overflow-clip top-0 w-[328px]" data-node-id="4125:10706" data-name="Grid">
            <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-node-id="4125:10707" data-name="Rows">
              <div className="h-[168px] relative shrink-0 w-full" data-node-id="4125:10708" data-name="Row" />
              <div className="border-[#9747ff] border-dashed border-t h-[168px] relative shrink-0 w-full" data-node-id="4125:10709" data-name="Row" />
              <div className="border-[#9747ff] border-dashed border-t h-[168px] relative shrink-0 w-full" data-node-id="4125:10710" data-name="Row" />
            </div>
          </div>
          <div className="[word-break:break-word] absolute bottom-0 content-stretch flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal gap-[48px] items-end leading-[0] left-0 py-[24px] text-[#9747ff] text-[11px] text-right top-0 tracking-[-0.275px]" data-node-id="4125:10711" data-name="Meta">
            <div className="flex flex-[1_0_0] flex-col justify-center min-h-px relative w-[50.043px]" data-node-id="4125:10712">
              <p className="leading-[normal]">1 slot</p>
            </div>
            <div className="flex flex-[1_0_0] flex-col justify-center min-h-px relative w-[50.043px]" data-node-id="4125:10713">
              <p className="leading-[normal]">2 slots</p>
            </div>
            <div className="flex flex-[1_0_0] flex-col justify-center min-h-px relative w-[50.043px]" data-node-id="4125:10714">
              <p className="leading-[normal]">3 slots</p>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#6d6d6e] text-[25px] w-[min-content]" data-node-id="4125:10725">
          Exemplos
        </p>
        <div className="content-stretch flex flex-col items-end relative shrink-0" data-node-id="4157:12962" data-name="exemple">
          <div className="bg-[var(--color\/neutral\/100,#f5f5f5)] content-stretch flex gap-[var(--2,0px)] items-center justify-center min-h-[36px] px-[var(--4,16px)] py-[var(--2,8px)] relative rounded-[var(--radius\/xl,8px)] shrink-0 size-[36px]" data-node-id="4157:12958" data-name="icon button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I4157:12958;4040:7699" data-name="icon/bell">
              <div className="absolute inset-[4.17%_8.33%_4.17%_8.34%]" data-node-id="I4157:12958;4040:7699;4040:6269" data-name="Vector (Stroke)">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke1} />
              </div>
            </div>
          </div>
          <div className="bg-[var(--color\/neutral\/50,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col items-start relative rounded-[var(--radius\/xl,8px)] shrink-0 w-[280px]" data-node-id="4157:12894" data-name="popover">
            <div className="content-stretch flex flex-col h-[40px] items-start justify-center p-[var(--6,24px)] relative shrink-0 w-full" data-node-id="I4157:12894;4125:10719" data-name="type=header">
              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-node-id="I4157:12894;4125:10719;4090:7638" data-name="AL">
                <div className="content-stretch flex gap-[var(--2,8px)] items-center relative shrink-0 w-full" data-node-id="I4157:12894;4125:10719;4413:11112" data-name="title/close button">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-px not-italic relative text-[20px] text-[color:var(--color\/text\/dark,#262626)]" data-node-id="I4157:12894;4125:10719;4090:7639">
                    Notificações
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I4157:12894;4125:10719;4090:7640" data-name="icon/x">
                    <div className="absolute inset-[20.83%]" data-node-id="I4157:12894;4125:10719;4090:7640;4040:7431" data-name="Vector (Stroke)">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke2} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[13px] text-[color:var(--color\/text\/soft,#6d6d6e)] w-full" data-node-id="I4157:12894;4125:10719;4383:11000">
                  Description
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start px-[16px] relative shrink-0 w-full" data-node-id="I4157:12894;4125:10720" data-name=".notifications">
              <div className="content-stretch flex gap-[8px] items-start py-[8px] relative shrink-0 w-full" data-node-id="I4157:12894;4125:10720;4157:12915">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I4157:12894;4125:10720;4157:12903" data-name="icon/info">
                  <div className="absolute inset-[4.17%]" data-node-id="I4157:12894;4125:10720;4157:12903;4040:6810" data-name="Vector (Stroke)">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke3} />
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center leading-[1.2] min-w-px not-italic relative" data-node-id="I4157:12894;4125:10720;4157:12917">
                  <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[16px] text-[color:var(--color\/text\/dark,#262626)] whitespace-nowrap" data-node-id="I4157:12894;4125:10720;4157:12914">
                    Lorem ipsum
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[13px] text-[color:var(--color\/text\/dark,#262626)] w-[min-content]" data-node-id="I4157:12894;4125:10720;4157:12916">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis odio nec libero iaculis iaculis id a velit.
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[10px] text-[color:var(--color\/text\/soft,#6d6d6e)] w-[min-content]" data-node-id="I4157:12894;4125:10720;4157:12918">
                    11/08/2025
                  </p>
                </div>
              </div>
              <Separator className="content-stretch flex h-px items-center relative rounded-[2px] shrink-0 w-full" direction="default" />
              <div className="content-stretch flex gap-[8px] items-start py-[8px] relative shrink-0 w-full" data-node-id="I4157:12894;4125:10720;4157:12927">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I4157:12894;4125:10720;4157:12928" data-name="icon/info">
                  <div className="absolute inset-[4.17%]" data-node-id="I4157:12894;4125:10720;4157:12928;4040:6810" data-name="Vector (Stroke)">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke3} />
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center leading-[1.2] min-w-px not-italic relative" data-node-id="I4157:12894;4125:10720;4157:12929">
                  <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[16px] text-[color:var(--color\/text\/dark,#262626)] whitespace-nowrap" data-node-id="I4157:12894;4125:10720;4157:12930">
                    Lorem ipsum
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[13px] text-[color:var(--color\/text\/dark,#262626)] w-[min-content]" data-node-id="I4157:12894;4125:10720;4157:12931">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis odio nec libero iaculis iaculis id a velit.
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[10px] text-[color:var(--color\/text\/soft,#6d6d6e)] w-[min-content]" data-node-id="I4157:12894;4125:10720;4157:12932">
                    11/08/2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color\/neutral\/50,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col items-start relative rounded-[var(--radius\/xl,8px)] shrink-0 w-[280px]" data-node-id="4733:11911" data-name="popover">
          <div className="content-stretch flex flex-col h-[40px] items-start justify-center px-[var(--4,16px)] py-[var(--6,24px)] relative shrink-0 w-full" data-node-id="I4733:11911;4125:10719" data-name="dialog header">
            <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-node-id="I4733:11911;4125:10719;7:4395" data-name="AL">
              <div className="content-stretch flex gap-[var(--2,8px)] items-center relative shrink-0 w-full" data-node-id="I4733:11911;4125:10719;7:4396" data-name="title/close button">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I4733:11911;4125:10719;7:4397" data-name="icon/info">
                  <div className="absolute inset-[4.17%]" data-node-id="I4733:11911;4125:10719;7:4397;4040:6810" data-name="Vector (Stroke)">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke4} />
                  </div>
                </div>
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-px not-italic relative text-[13px] text-[color:var(--color\/text\/dark,#262626)]" data-node-id="I4733:11911;4125:10719;7:4398">
                  Novidade!
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I4733:11911;4125:10719;7:4399" data-name="icon/x">
                  <div className="absolute inset-[20.83%]" data-node-id="I4733:11911;4125:10719;7:4399;4040:7431" data-name="Vector (Stroke)">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-end pb-[var(--4,16px)] px-[var(--4,16px)] relative shrink-0 w-full" data-node-id="I4733:11911;4125:10720" data-name="body">
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] min-w-full not-italic relative shrink-0 text-[13px] text-[color:var(--color\/text\/dark,#262626)] w-[min-content]" data-node-id="I4733:11911;4125:10720;7:4402">
              Agora você pode enviar diretamente para análise os processos do Diário Oficial que estão elegíveis para antecipação!
            </p>
            <div className="bg-[var(--color\/opacities\/light\/0\,01\%,rgba(255,255,255,0))] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch flex gap-[6px] items-center justify-center min-h-[24px] px-[var(--2,8px)] py-[var(--1,4px)] relative rounded-[var(--radius\/md,4px)] shrink-0" data-node-id="I4733:11911;4125:10720;7:4716" data-name="button">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[color:var(--color\/text\/dark,#262626)] whitespace-nowrap" data-node-id="I4733:11911;4125:10720;7:4716;4035:5608">
                <p className="leading-[1.2]">Fechar</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[-6px] h-[5px] right-[18.5px] w-[11.5px]" data-node-id="I4733:11911;4732:11477" data-name="Arrow">
            <div className="absolute inset-[0_0_6.51%_0]">
              <img alt="" className="block max-w-none size-full" src={imgArrow1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Styles contained in the design

- `heading/02 - 49px`: Font(family: "Inter", style: Regular, size: 49, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0)
- `heading/06 - 20px`: Font(family: "Inter", style: Regular, size: 20, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0)
- `paragraph small/medium`: Font(family: "Geist", style: Medium, size: 14, weight: 500, lineHeight: 1.5, letterSpacing: 0.5)
- `shadow/l`: Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 4), radius: 6, spread: -4); Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 10), radius: 15, spread: -3)
- `heading/05 - 25px`: Font(family: "Inter", style: Regular, size: 25, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0)
- `body/01 - 16px`: Font(family: "Inter", style: Regular, size: 16, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0)
- `body/02 - 13px`: Font(family: "Inter", style: Regular, size: 13, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0)
- `caption/01 - 10px`: Font(family: "Inter", style: Regular, size: 10, weight: 400, lineHeight: 1.2000000476837158, letterSpacing: 0)
