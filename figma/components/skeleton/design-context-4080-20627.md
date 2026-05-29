# Figma — Skeleton (`4080:20627`) — get_design_context

```tsx
const imgSkeletonPlaceholderAvatar = "../../assets/img-bg-48x48-gray-100.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke = "../../assets/loader-light.svg";

function SkeletonPlaceholderObject({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[260px]"} data-node-id="4080:20608" data-name="skeleton / placeholder object">
      <div className="bg-[var(--color\/neutral\/100,#f5f5f5)] h-[132px] relative rounded-[8px] shrink-0 w-full" data-node-id="4080:20609" data-name="Background" />
    </div>
  );
}

function SkeletonPlaceholderLine({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[260px]"} data-node-id="4080:20604" data-name="skeleton / placeholder line">
      <div className="bg-[var(--color\/neutral\/100,#f5f5f5)] h-[16px] relative rounded-[8px] shrink-0 w-full" data-node-id="4080:20605" data-name="Background" />
    </div>
  );
}

function SkeletonPlaceholderAvatar({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[48px]"} data-node-id="4080:20600" data-name="skeleton / placeholder avatar">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSkeletonPlaceholderAvatar} />
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[12px] items-start relative w-[320px]"} data-node-id="4080:20658" data-name="skeleton">
      <SkeletonPlaceholderAvatar className="relative shrink-0 size-[48px]" />
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-node-id="4080:20652" data-name="Stack">
        <SkeletonPlaceholderLine className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" />
        <SkeletonPlaceholderObject className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" />
      </div>
    </div>
  );
}

export default function Skeleton1() {
  return (
    <div className="bg-[var(--color\/neutral\/50,#fafafa)] content-stretch flex flex-col items-start relative rounded-[32px] size-full" data-node-id="4080:20627" data-name="Skeleton">
      <div className="bg-[var(--color\/neutral\/700,#404040)] content-stretch flex flex-col gap-[48px] items-start p-[32px] relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-node-id="4080:20628" data-name="Page header">
        <div className="h-[20px] relative shrink-0 w-[113.863px]" data-node-id="I4080:20628;4001:214" data-name="$eehd9xsz19k 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[140.53%] left-[-23.82%] max-w-none top-[-19.16%] w-[147.92%]" src={imgEehd9Xsz19K1} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="I4080:20628;4001:215" data-name="icon/title/description">
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="I4080:20628;4115:12306" data-name="icon/title">
            <div className="overflow-clip relative shrink-0 size-[40px]" data-node-id="I4080:20628;4023:1411" data-name="icon/loader">
              <div className="absolute inset-[4.17%]" data-node-id="I4080:20628;4023:1411;4040:6871" data-name="Vector (Stroke)">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke} />
              </div>
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-px not-italic relative text-[49px] text-[color:var(--color\/neutral\/50,#fafafa)]" data-node-id="I4080:20628;4001:216">
              Skeleton
            </p>
          </div>
          <div className="content-stretch flex items-center justify-center pl-[56px] relative shrink-0 w-full" data-node-id="I4080:20628;4115:12565" data-name="description">
            <div className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative text-[0px] text-[color:var(--color\/neutral\/50,#fafafa)]" data-node-id="I4080:20628;4115:9502">
              <p className="leading-[1.2] mb-0 text-[20px]">Usado para indicar visualmente que o conteúdo está sendo carregado, ocupando o espaço onde os elementos reais aparecerão, de forma animada.</p>
              <a className="[text-underline-position:from-font] block cursor-pointer decoration-from-font decoration-solid leading-[1.2] text-[20px] underline" href="https://ui.shadcn.com/docs/components/skeleton" target="_blank">
                Veja aqui a animação.
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[64px] items-start p-[64px] relative shrink-0 w-full" data-node-id="4080:20629" data-name="Content container">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#6d6d6e] text-[25px] w-[min-content]" data-node-id="4080:20648">Skeleton</p>
        <Skeleton className="content-stretch flex gap-[12px] items-start relative shrink-0 w-[320px]" />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#6d6d6e] text-[25px] w-[min-content]" data-node-id="4080:20659">Skeleton / placeholder avatar</p>
        <SkeletonPlaceholderAvatar className="relative shrink-0 size-[48px]" />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#6d6d6e] text-[25px] w-[min-content]" data-node-id="4080:20660">Skeleton / placeholder line</p>
        <SkeletonPlaceholderLine className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#6d6d6e] text-[25px] w-[min-content]" data-node-id="4080:20661">Skeleton / placeholder object</p>
        <SkeletonPlaceholderObject className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" />
      </div>
    </div>
  );
}
```

## Styles contained in the design
- `heading/02 - 49px`, `heading/06 - 20px`, `heading/05 - 25px`
