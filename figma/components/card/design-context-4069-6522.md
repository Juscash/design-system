# Figma — Card (`4069:6522`) — get_design_context (page Componentes)

```tsx
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke = "../../assets/layout-panel-top.svg";
const imgColumn = "../../assets/img-grid-cell-32x32-5.svg";
const imgColumn1 = "../../assets/img-grid-line-v-519.svg";
const imgVectorStroke1 = "../../assets/eye-off.svg";

function Slot({ className }: { className?: string }) {
  return (
    <div className={className || "border border-[#9747ff] border-dashed content-stretch flex h-[48px] items-center justify-center p-[8px] relative rounded-[8px]"} data-node-id="4066:2838" data-name=".slot">
      <p className="[word-break:break-word] font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#c89dff] text-[14px] tracking-[0.07px] whitespace-nowrap" data-node-id="4066:2837">
        Slot
      </p>
    </div>
  );
}
type CardProps = {
  className?: string;
  footerSlot?: React.ReactNode | null;
  headerSlot?: React.ReactNode | null;
  mainSlot?: React.ReactNode | null;
  slotNo?: "1 slot" | "2 slots" | "3 slots" | "slot no.4" | "slot no.5" | "slot no.6";
  state?: "default" | "hover" | "focus";
};

function Card({ className, footerSlot = null, headerSlot = null, mainSlot = null, slotNo = "1 slot", state = "default" }: CardProps) {
  const isDefaultAnd2Slots = state === "default" && slotNo === "2 slots";
  const isDefaultAnd3Slots = state === "default" && slotNo === "3 slots";
  const isFocusAnd2Slots = state === "focus" && slotNo === "2 slots";
  const isFocusAnd3Slots = state === "focus" && slotNo === "3 slots";
  const isHoverAndSlotNo4 = state === "hover" && slotNo === "slot no.4";
  const isHoverAndSlotNo5 = state === "hover" && slotNo === "slot no.5";
  return (
    <div className={className || `${String.raw`bg-[var(--color\/background\/white,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch flex flex-col items-start p-[var(--6,24px)] relative rounded-[var(--radius\/xl,8px)] w-[280px] `}${state === "hover" && ["slot no.6", "slot no.5", "slot no.4"].includes(slotNo) ? "drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]" : state === "focus" && ["1 slot", "2 slots", "3 slots"].includes(slotNo) ? String.raw`overflow-clip shadow-[0px_0px_0px_3px_var(--color\/neutral\/300,#d4d4d4)]` : "drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"}`} id={isHoverAndSlotNo4 ? "node-4627_11703" : isFocusAnd3Slots ? "node-6134_9827" : isDefaultAnd3Slots ? "node-4069_5600" : isHoverAndSlotNo5 ? "node-4627_11700" : isFocusAnd2Slots ? "node-6134_9824" : isDefaultAnd2Slots ? "node-4069_5597" : state === "hover" && slotNo === "slot no.6" ? "node-4627_11698" : state === "focus" && slotNo === "1 slot" ? "node-6134_9822" : "node-4069_5595"}>
      {(isDefaultAnd2Slots || isFocusAnd2Slots || isHoverAndSlotNo5 || isDefaultAnd3Slots || isFocusAnd3Slots || isHoverAndSlotNo4) && (headerSlot || <Slot className="border border-[#9747ff] border-dashed content-stretch flex h-[40px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full" />)}
      {mainSlot || <Slot className="border border-[#9747ff] border-dashed content-stretch flex h-[40px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full" />}
      {(isDefaultAnd3Slots || isFocusAnd3Slots || isHoverAndSlotNo4) && (footerSlot || <Slot className="border border-[#9747ff] border-dashed content-stretch flex h-[40px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full" />)}
    </div>
  );
}

export default function Card1() {
  return (
    <div className="bg-[var(--color\/neutral\/50,#fafafa)] content-stretch flex flex-col items-start relative rounded-[32px] size-full" data-node-id="4069:6522" data-name="Card">
      <div className="bg-[var(--color\/neutral\/700,#404040)] content-stretch flex flex-col gap-[48px] items-start p-[32px] relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-node-id="4069:6523" data-name="Page header">
        <div className="h-[20px] relative shrink-0 w-[113.863px]" data-node-id="I4069:6523;4001:214" data-name="$eehd9xsz19k 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[140.53%] left-[-23.82%] max-w-none top-[-19.16%] w-[147.92%]" src={imgEehd9Xsz19K1} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="I4069:6523;4001:215" data-name="icon/title/description">
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="I4069:6523;4115:12306" data-name="icon/title">
            <div className="overflow-clip relative shrink-0 size-[40px]" data-node-id="I4069:6523;4023:1411" data-name="icon/layout-panel-top">
              <div className="absolute inset-[8.33%]" data-node-id="I4069:6523;4023:1411;4040:6841" data-name="Vector (Stroke)">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke} />
              </div>
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-px not-italic relative text-[49px] text-[color:var(--color\/neutral\/50,#fafafa)]" data-node-id="I4069:6523;4001:216">
              Card
            </p>
          </div>
          <div className="content-stretch flex items-center justify-center pl-[56px] relative shrink-0 w-full" data-node-id="I4069:6523;4115:12565" data-name="description">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] min-w-px not-italic relative text-[20px] text-[color:var(--color\/neutral\/50,#fafafa)]" data-node-id="I4069:6523;4115:9502">
              Componente personalizável que geralmente inclui cabeçalho, conteúdo principal e rodapé.
            </p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[64px] items-start p-[64px] relative shrink-0 w-full" data-node-id="4069:6524" data-name="Content container">
        <div className="h-[547px] relative shrink-0 w-[1069px]" data-node-id="4069:5584" data-name="Component">
          <div className="absolute h-[519px] left-[56px] overflow-clip top-[27px] w-[1008px]" data-node-id="4069:5585" data-name="Grid">
            <div className="absolute content-stretch flex flex-col h-[545px] items-start left-0 top-[-24px] w-[1008px]" data-node-id="4069:5586" data-name="Rows">
              <div className="h-[168px] relative shrink-0 w-full" data-node-id="4069:5587" data-name="Row" />
              <div className="border-[#9747ff] border-dashed border-t h-[168px] relative shrink-0 w-full" data-node-id="4069:5588" data-name="Row" />
              <div className="border-[#9747ff] border-dashed border-t h-[185px] relative shrink-0 w-full" data-node-id="4069:5589" data-name="Row" />
            </div>
            <div className="absolute bottom-0 content-stretch flex items-start left-0 top-0 w-[1008px]" data-node-id="4627:11690" data-name="Columns">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-node-id="4627:11691" data-name="Column">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColumn} />
              </div>
              <div className="flex-[1_0_0] h-full min-w-px relative" data-node-id="4627:11692" data-name="Column">
                <div className="absolute inset-[0_99.85%_0_-0.15%]">
                  <img alt="" className="block max-w-none size-full" src={imgColumn1} />
                </div>
              </div>
              <div className="flex-[1_0_0] h-full min-w-px relative" data-node-id="6134:9838" data-name="Column">
                <div className="absolute inset-[0_99.85%_0_-0.15%]">
                  <img alt="" className="block max-w-none size-full" src={imgColumn1} />
                </div>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] absolute bottom-[45px] content-stretch flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal gap-[48px] items-end leading-[0] left-0 py-[24px] text-[#9747ff] text-[11px] text-right top-[20px] tracking-[-0.275px]" data-node-id="4069:5590" data-name="Meta">
            <div className="flex flex-[1_0_0] flex-col justify-center min-h-px relative w-[50.043px]" data-node-id="4069:5591"><p className="leading-[normal]">1 slot</p></div>
            <div className="flex flex-[1_0_0] flex-col justify-center min-h-px relative w-[50.043px]" data-node-id="4069:5592"><p className="leading-[normal]">2 slots</p></div>
            <div className="flex flex-[1_0_0] flex-col justify-center min-h-px relative w-[50.043px]" data-node-id="4069:5593"><p className="leading-[normal]">3 slots</p></div>
          </div>
          <div className="[word-break:break-word] absolute content-stretch flex font-['JetBrains_Mono:Regular',sans-serif] font-normal gap-[48px] items-start leading-[0] left-[61px] lowercase px-[24px] right-0 text-[#9747ff] text-[11px] text-center top-0 tracking-[-0.275px] whitespace-nowrap" data-node-id="4627:11713" data-name="Meta">
            <div className="flex flex-[1_0_0] flex-col justify-center min-w-px overflow-hidden relative text-ellipsis" data-node-id="4627:11714"><p className="leading-[normal] overflow-hidden text-ellipsis">DEFAULT</p></div>
            <div className="flex flex-[1_0_0] flex-col justify-center min-w-px overflow-hidden relative text-ellipsis" data-node-id="4627:11715"><p className="leading-[normal] overflow-hidden text-ellipsis">HOVER</p></div>
            <div className="flex flex-[1_0_0] flex-col justify-center min-w-px overflow-hidden relative text-ellipsis" data-node-id="6134:9837"><p className="leading-[normal] overflow-hidden text-ellipsis">focus</p></div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[1.2] not-italic relative shrink-0 w-full" data-node-id="4627:11721" data-name="Description">
          <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#6d6d6e] text-[25px] w-full" data-node-id="4627:11722">Hover e focus</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[20px] text-[color:var(--color\/text\/soft,#6d6d6e)] w-full" data-node-id="4627:11723">Inclua o hover e focus apenas em cards clicáveis, que redirecionam para outra página ou ação.</p>
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#6d6d6e] text-[25px] w-[min-content]" data-node-id="4069:6549">Exemplos</p>
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0" data-node-id="4069:5606" data-name="Content">
          <div className="content-start flex flex-wrap gap-[48px] items-start relative shrink-0 w-[848px]" data-node-id="4069:5607" data-name="Components">
            <div className="bg-[var(--color\/background\/white,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[24px] items-start p-[var(--6,24px)] relative rounded-[var(--radius\/xl,8px)] shrink-0 w-[368px]" data-node-id="4142:15680" data-name="card">
              {/* Login card example */}
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start not-italic relative shrink-0 w-full" data-node-id="I4142:15680;4069:5598" data-name=".Card Header Default">
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--color\/text\/dark,#262626)] w-full" data-node-id="I4142:15680;4069:5598;4069:5641">
                  <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] text-[31px]">Boas-vindas!</p>
                </div>
                <p className="leading-[1.2] relative shrink-0 text-[16px] text-[color:var(--color\/text\/soft,#6d6d6e)] w-full" data-node-id="I4142:15680;4069:5598;4069:5642">
                  Bem-vindo ao Programa de Benefícios JusCash! Por favor, insira seus dados abaixo para realizar o login.
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="I4142:15680;4069:5599" data-name="Property 1=login">
                <div className="content-stretch flex flex-col gap-[var(--2,8px)] items-start relative shrink-0 w-[320px]" data-node-id="I4142:15680;4069:5599;4120:8992" data-name="input">
                  <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[16px] text-[color:var(--color\/text\/dark,#262626)] w-full" data-node-id="I4142:15680;4069:5599;4120:8992;4062:2582">E-mail</p>
                  <div className="bg-[var(--color\/neutral\/50,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch flex gap-[var(--2,0px)] h-[36px] items-center min-h-[36px] overflow-clip px-[var(--3,12px)] py-[var(--2,8px)] relative rounded-[var(--radius\/xl,8px)] shrink-0 w-full" data-node-id="I4142:15680;4069:5599;4120:8992;4062:2536" data-name="Input">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[21px] items-center min-w-px overflow-clip relative" data-node-id="I4142:15680;4069:5599;4120:8992;4062:2537" data-name="AL">
                      <div className="content-stretch flex flex-[1_0_0] gap-px items-center min-w-px relative" data-node-id="I4142:15680;4069:5599;4120:8992;4062:2539" data-name="AL">
                        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[13px] text-[color:var(--color\/text\/soft,#6d6d6e)] whitespace-nowrap" data-node-id="I4142:15680;4069:5599;4120:8992;4062:2541">seu@email.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[var(--2,8px)] items-start relative shrink-0 w-[320px]" data-node-id="I4142:15680;4069:5599;4120:8993" data-name="input">
                  <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[16px] text-[color:var(--color\/text\/dark,#262626)] w-full" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3154">Senha</p>
                  <div className="bg-[var(--color\/neutral\/50,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch flex gap-[var(--2,0px)] h-[40px] items-center min-h-[36px] overflow-clip px-[var(--3,12px)] py-[var(--2,8px)] relative rounded-[var(--radius\/xl,8px)] shrink-0 w-full" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3155" data-name="Input">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[21px] items-center min-w-px overflow-clip relative" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3156" data-name="AL">
                      <div className="content-stretch flex flex-[1_0_0] gap-px items-center min-w-px relative" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3158" data-name="AL">
                        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[13px] text-[color:var(--color\/text\/soft,#6d6d6e)] whitespace-nowrap" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3160">Digite sua senha</p>
                      </div>
                      <div className="relative shrink-0 size-[20px]" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3161" data-name=".decoration">
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3161;4051:1840" data-name="icon/eye-off">
                          <div className="absolute inset-[4.17%_4.16%]" data-node-id="I4142:15680;4069:5599;4120:8993;4062:3161;4051:1840;4040:6600" data-name="Vector (Stroke)">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--color\/button\/brand\/default,#008633)] content-stretch flex gap-[var(--2,8px)] items-center justify-center min-h-[36px] px-[var(--4,16px)] py-[var(--2,8px)] relative rounded-[var(--radius\/xl,8px)] shrink-0 w-full" data-node-id="I4142:15680;4069:5599;4122:7607" data-name="button">
                  <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--color\/neutral\/50,#fafafa)] whitespace-nowrap" data-node-id="I4142:15680;4069:5599;4122:7607;4035:5768">
                    <p className="leading-[1.2]">Entrar</p>
                  </div>
                </div>
                <p className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[1.2] min-w-full not-italic relative shrink-0 text-[13px] text-[color:var(--color\/text\/dark,#262626)] text-center underline w-[min-content]" data-node-id="I4142:15680;4069:5599;4122:7612">
                  Esqueci minha senha
                </p>
              </div>
            </div>
            <div className="bg-[var(--color\/background\/white,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[24px] items-start p-[var(--6,24px)] relative rounded-[var(--radius\/xl,8px)] shrink-0 w-[368px]" data-node-id="4142:15789" data-name="card">
              {/* Feedback card example */}
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start not-italic relative shrink-0 w-full" data-node-id="I4142:15789;4069:5598" data-name=".Card Header Default">
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--color\/text\/dark,#262626)] w-full" data-node-id="I4142:15789;4069:5598;4069:5641">
                  <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] text-[20px]">Queremos ouvir você!</p>
                </div>
                <p className="leading-[1.2] relative shrink-0 text-[16px] text-[color:var(--color\/text\/soft,#6d6d6e)] w-full" data-node-id="I4142:15789;4069:5598;4069:5642">
                  Sua experiência no nosso Programa de Benefícios é muito importante para a gente. O seu feedback pode fazer toda a diferença para construirmos um programa ainda mais completo e vantajoso para você.
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="I4142:15789;4069:5599" data-name="Property 1=login">
                <div className="bg-[var(--color\/button\/brand\/default,#008633)] content-stretch flex gap-[var(--2,8px)] items-center justify-center min-h-[36px] px-[var(--4,16px)] py-[var(--2,8px)] relative rounded-[var(--radius\/xl,8px)] shrink-0 w-full" data-node-id="I4142:15789;4069:5599;4122:7607" data-name="button">
                  <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--color\/neutral\/50,#fafafa)] whitespace-nowrap" data-node-id="I4142:15789;4069:5599;4122:7607;4035:5768">
                    <p className="leading-[1.2]">Enviar feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Styles contained in the design
- `heading/02 - 49px`, `heading/06 - 20px`, `paragraph small/medium` (Geist Medium 14/1.5/0.5), `shadow/xs`, `focus`, `shadow/m`, `heading/05 - 25px`, `heading/04 - 31px`, `body/01 - 16px`, `body/02 - 13px`
