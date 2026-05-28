# Figma — `.form exemple` (`4122:8523`) — get_design_context

> Importante: este é um **exemplo composto** (não é um componente "Form Item" do DS). Demonstra como combinar primitivos (Input, Button, link) num formulário típico. Para um wrapper Form/Form.Item real, usar `antd Form` re-exportado pelo barrel do DS.

## Variantes

- `property1="login"` (4122:7619) — base
- `property1="Variant2"` (4122:8524) — variação alternativa (mesma estrutura, posição diferente)

## Estrutura (login)

```tsx
function FormExemple({ className, property1 = "login" }) {
  return (
    <div className={className || "flex flex-col gap-[16px] items-start"}>
      {/* Input E-mail */}
      <div className="flex flex-col gap-[8px] items-start w-[320px]" data-name="input">
        <p className="font-['Inter:Regular'] text-[16px] text-[color:var(--color/text/dark,#262626)] w-full">E-mail</p>
        <div className="bg-[var(--color/neutral/50,#fafafa)] border border-[var(--color/border/regular,#d4d4d4)] flex gap-[0px] h-[36px] items-center min-h-[36px] overflow-clip px-[12px] py-[8px] rounded-[8px] w-full">
          <div className="flex flex-1 gap-[8px] h-[21px] items-center overflow-clip">
            <p className="text-[13px] text-[color:var(--color/text/soft,#6d6d6e)] whitespace-nowrap">seu@email.com</p>
          </div>
        </div>
      </div>

      {/* Input Senha (com icon/eye-off) */}
      <div className="flex flex-col gap-[8px] items-start w-[320px]" data-name="input">
        <p className="text-[16px] text-[color:var(--color/text/dark,#262626)] w-full">Senha</p>
        <div className="bg-[var(--color/neutral/50,#fafafa)] border border-[var(--color/border/regular,#d4d4d4)] flex h-[40px] items-center min-h-[36px] overflow-clip px-[12px] py-[8px] rounded-[8px] w-full">
          <div className="flex flex-1 gap-[8px] h-[21px] items-center">
            <p className="text-[13px] text-[color:var(--color/text/soft,#6d6d6e)] whitespace-nowrap">Digite sua senha</p>
            <div className="size-[20px]" data-name=".decoration">
              <div className="size-[16px]" data-name="icon/eye-off">
                <img src={imgVectorStrokeEyeOff} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Entrar brand */}
      <div className="bg-[var(--color/button/brand/default,#008633)] flex gap-[8px] items-center justify-center min-h-[36px] px-[16px] py-[8px] rounded-[8px] w-full" data-name="button">
        <p className="text-[13px] text-[color:var(--color/neutral/50,#fafafa)] whitespace-nowrap">Entrar</p>
      </div>

      {/* Link "Esqueci minha senha" underline */}
      <p className="font-['Inter:Regular'] text-[13px] text-[color:var(--color/text/dark,#262626)] text-center underline w-full">
        Esqueci minha senha
      </p>
    </div>
  );
}
```

## Composição

| Slot | Componente real do DS |
|---|---|
| Label "E-mail" | `Input` (label prop) |
| Campo email | `Input` |
| Label "Senha" | `Input` (label prop) |
| Campo senha + olho | `Input` com `type="password"` |
| Botão | `Button variant="primary"` |
| Link recuperar | `<Link>` ou `<a>` com underline |

Styles: body/01 16px, body/02 13px.
