# Figma — Avatar (`4080:9746`) — get_design_context

```tsx
const imgBackground = "../../assets/img-bg-40x40-gray-200.svg";
const imgFillInitialsSizeSmallRoundnessTypeRound = "../../assets/img-bg-32x32-gray-200.svg";
const imgVectorStroke = "../../assets/chevron-down.svg";
const imgBackground1 = "../../assets/img-bg-40x40-gray-100.svg";
const imgPictureOffSizeSmallRoundnessTypeRound = "../../assets/img-bg-32x32-gray-100.svg";
const imgEehd9Xsz19K1 = "../../assets/img-logo-juscash-white.png";
const imgVectorStroke1 = "../../assets/img-icon-stroke-light-37x33.svg";
const imgArrow = "../../assets/img-tooltip-arrow-dark-2.svg";

type AvatarProps = {
  className?: string;
  fill?: "initials";
  roundnessType?: "round";
  size?: "small" | "regular";
};

function Avatar({ className, fill = "initials", roundnessType = "round", size = "regular" }: AvatarProps) {
  const isRegularAndRound = size === "regular" && roundnessType === "round";
  const isSmallAndRound = size === "small" && roundnessType === "round";
  return (
    <div className={className || `overflow-clip relative ${isSmallAndRound ? "size-[32px]" : "size-[40px]"}`} id={isSmallAndRound ? "node-4146_14277" : "node-4146_14272"}>
      {isRegularAndRound && (
        <>
          <div className="absolute left-0 size-[40px] top-0" data-node-id="4146:14273" data-name="Background">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBackground} />
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[20px] not-italic size-[40px] text-[0px] text-[color:var(--color\/text\/dark,#262626)] text-center top-[20px]" data-node-id="4146:14274">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] text-[13px]">CN</p>
          </div>
        </>
      )}
      {isSmallAndRound && (
        <>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFillInitialsSizeSmallRoundnessTypeRound} />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[16px] not-italic size-[32px] text-[0px] text-[color:var(--color\/text\/dark,#262626)] text-center top-[16px]" data-node-id="4146:14279">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] text-[13px]">CN</p>
          </div>
        </>
      )}
    </div>
  );
}

type AvatarMenuProps = { className?: string; state?: "default" };

function AvatarMenu({ className, state = "default" }: AvatarMenuProps) {
  return (
    <div className={className || "content-stretch flex gap-[4px] items-center relative"} data-node-id="4146:14348">
      <Avatar className="overflow-clip relative shrink-0 size-[32px]" size="small" />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="4146:14344" data-name="icon/chevron-down">
        <div className="absolute inset-[33.33%_20.83%]" data-node-id="I4146:14344;4040:6404" data-name="Vector (Stroke)">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke} />
        </div>
      </div>
    </div>
  );
}

/*
  Doc-page Avatar (4080:9746):
  - Variantes: size ∈ {small (32x32), regular (40x40)}; roundnessType=round; fill ∈ {initials, picture (off variant 4073:11858/_11863)}
  - Avatar stack (4051:1940 regular, 4051:1933 small): 3 avatares com offset -8px (initials "CN", "JS", "KT"). mr-[-8px]
  - Avatar menu (4146:14348): avatar 32px small + icon/chevron-down 16px
  - States enumerados na meta da doc-page: Default, focus, ative (sic)
  - Tooltip suportado: bg neutral/800 200x44 com texto "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
*/

export default function Avatar2() {
  return (
    <div className="bg-[var(--color\/neutral\/50,#fafafa)] content-stretch flex flex-col items-start relative rounded-[32px] size-full" data-node-id="4080:9746" data-name="Avatar">
      {/* Page header (4080:9747): título "Avatar" + descrição "Componente com foto ou iniciais para representar o usuário." */}
      {/* Avatar stack 4106:8597, Avatar menu 4146:14374 (matriz Default/focus/ative em coluna), Tooltip 8735:14362 */}
    </div>
  );
}
```

## Styles contained in the design
- `heading/02 - 49px`, `heading/06 - 20px`, `body/02 - 13px`, `heading/05 - 25px`, `focus`
