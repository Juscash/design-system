# Figma — Alert (`4077:7402`) — get_design_context

```tsx
const imgVectorStroke = "../../assets/heart-dark-15.svg";
const imgVectorStroke1 = "../../assets/heart-red.svg";
const imgVectorStroke2 = "../../assets/img-icon-stroke-dark-11x10.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke3 = "../../assets/img-icon-stroke-light-37x37-2.svg";
const imgVectorStroke4 = "../../assets/img-icon-stroke-dark-9x9-2.svg";
const imgVectorStroke5 = "../../assets/img-icon-stroke-dark-15x15.svg";
const imgVectorStroke6 = "../../assets/img-icon-stroke-red-15x15.svg";
const imgVectorStrokeCheck = "../../assets/img-icon-stroke-dark-12x9.svg";

type AlertProps = {
  className?: string;
  leftIcon?: React.ReactNode | null;
  rightIcon?: React.ReactNode | null;
  showButton?: boolean;
  showLeftIcon?: boolean;
  showLine2?: boolean;
  showRightIcon?: boolean;
  type?: "neutral" | "error";
};

function Alert({ className, leftIcon = null, rightIcon = null, showButton = false, showLeftIcon = true, showLine2 = false, showRightIcon = false, type = "neutral" }: AlertProps) {
  const isError = type === "error";
  const isNeutral = type === "neutral";
  return (
    <div className={className || "bg-[var(--color\/neutral\/50,#fafafa)] border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch flex gap-[16px] items-center p-[16px] relative rounded-[8px] w-[400px]"} id={isError ? "node-4077_8746" : "node-4077_8730"}>
      <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-w-px relative" id={isError ? "node-4077_8747" : "node-4077_8731"} data-name="AL">
        {isNeutral && showLeftIcon && (
          <div className="content-stretch flex items-center pt-[3px] relative shrink-0" data-node-id="4077:8732" data-name="Aligner">
            {leftIcon || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="4077:8935" data-name="icon/heart">
                <div className="absolute inset-[8.33%_4.17%]" data-node-id="I4077:8935;4040:6785" data-name="Vector (Stroke)">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke} />
                </div>
              </div>
            )}
          </div>
        )}
        {isNeutral && (
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-[var(--1,4px)] items-start leading-[1.2] min-w-px not-italic relative" data-node-id="4077:8734" data-name="AL">
            <p className="relative shrink-0 text-[16px] text-[color:var(--color\/text\/dark,#262626)] w-full" data-node-id="4077:8735">Line 1</p>
            {showLine2 && (
              <p className="relative shrink-0 text-[13px] text-[color:var(--color\/text\/soft,#6d6d6e)] w-full" data-node-id="4077:8736">Line 2</p>
            )}
          </div>
        )}
        {isError && showLeftIcon && (
          <div className="content-stretch flex items-center pt-[3px] relative shrink-0" data-node-id="4077:8748" data-name="Aligner">
            {leftIcon || (
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="4077:8941" data-name="icon/heart">
                <div className="absolute inset-[8.33%_4.17%]" data-node-id="I4077:8941;4040:6785" data-name="Vector (Stroke)">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke1} />
                </div>
              </div>
            )}
          </div>
        )}
        {isError && (
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-[var(--1,4px)] items-start leading-[1.2] min-w-px not-italic relative text-[color:var(--color\/feedback\/red\/500,#d2190b)]" data-node-id="4077:8750" data-name="AL">
            <p className="relative shrink-0 text-[16px] w-full" data-node-id="4077:8751">Line 1</p>
            {showLine2 && <p className="relative shrink-0 text-[13px] w-full" data-node-id="4077:8752">Line 2</p>}
          </div>
        )}
      </div>
      {showButton && (
        <div className="border border-[var(--color\/border\/regular,#d4d4d4)] border-solid content-stretch flex gap-[var(--2,8px)] items-center justify-center min-h-[36px] px-[var(--4,16px)] py-[var(--2,8px)] relative rounded-[var(--radius\/xl,8px)] shrink-0" data-node-id="4077:9312" data-name="button">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--color\/text\/dark,#262626)] whitespace-nowrap" data-node-id="I4077:9312;4035:5512">
            <p className="leading-[1.2]">Label</p>
          </div>
        </div>
      )}
      {showRightIcon && (
        <div className="content-stretch flex items-center pt-[3px] relative shrink-0" data-node-id="4144:16510" data-name="Aligner">
          {rightIcon || (
            <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="4144:16511" data-name="icon/heart">
              <div className="absolute inset-[8.33%_4.17%]" data-node-id="I4144:16511;4040:6785" data-name="Vector (Stroke)">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* Página Alert doc-page renderiza:
   - Page header (icon/circle-alert + título "Alert" Inter Bold 49px + descrição)
   - Descrição: "Cor — O componente de alerta pode utilizar a cor de feedback adequada ao contexto. Ex.: vermelho para erros e amarelo para avisos ou alertas."
   - Exemplos (4077:9423):
     1. Alert 4077:9424: neutral + icon/check + "Configurações salvas com sucesso." + "Line 2" + icon/x à direita
     2. Alert 4077:9425: neutral + icon/circle-alert + "Seu plano expirará em 3 dias. Considere renová-lo para evitar interrupções."
     3. Alert 4077:9426: error + icon/circle-alert + "Falha ao salvar os dados." + "Tente novamente mais tarde." (cor red/500)
     4. Alert 4146:11659: neutral + icon/check + "Arquivo excluído com sucesso." + botão outline "Desfazer"
*/
```

## Styles contained in the design
- `heading/02 - 49px`, `heading/06 - 20px`, `body/01 - 16px`, `heading/05 - 25px`, `body/02 - 13px`
