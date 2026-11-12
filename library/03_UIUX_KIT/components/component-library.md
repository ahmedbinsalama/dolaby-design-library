# DoLaby component library 1.0.0

Thirty editable HTML/CSS/JS families. Canonical descriptions are in component-catalog.json; catalog-data.js is its generated local browsing view. component-details.json preserves family-specific source measurements/properties for deliberate generator runs. Shared color/radius/focus/motion references resolve to01_SHARED_FOUNDATIONS/tokens.css.

## U01 — Header / Navigation

Keep core task, wardrobe and saved ideas reachable.

**Anatomy:** logo/home link, primary navigation, language, account/privacy, assistant trigger

**Editable properties:** {"language": "ar|en", "currentDestination": "S01–S22", "items": "label + href + current state"}

**Geometry:** Header max1328px; 40/24/16px interior gutters; mobile navigation wraps below brand/actions.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** default, current destination, keyboard focus

**Keyboard:** Tab to links; Enter activates; visible current destination.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U02 — Wordmark / AssistantTrigger

Home identity and text-assistant action remain distinct.

**Anatomy:** canonical logo SVG, home anchor, separate assistant button

**Editable properties:** {"logoSrc": "canonical-logo/logo-lockup.svg", "assistantLabel": "localized accessible name", "homeTarget": "S01"}

**Geometry:** Logo width145px desktop,120px mobile; separate44px assistant target.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** home link, assistant trigger, focus

**Keyboard:** Both actions have independent focus targets and names.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U03 — Button / IconButton

Make the next reversible action clear; disabled/loading communicates scope.

**Anatomy:** container, text label, optional icon, busy/disabled state

**Editable properties:** {"kind": "primary|default|plain|danger", "disabled": "boolean", "busy": "aria-busy", "action": "data-action or data-go"}

**Geometry:** 48px min height; padding11×22px; icon button44×44; shared control radius8px.

**Variants:** AR / RTL, EN / LTR

**States/events:** default, hover, pressed, focus, disabled, loading

**Keyboard:** Enter/Space activates; disabled native button cannot activate; focus ring remains visible.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U04 — Link

Navigate to a real destination, without acting as a false button.

**Anatomy:** text anchor, destination, focus/visited treatment

**Editable properties:** {"href": "actual URL or local route", "label": "AR/EN text", "external": "declare context before departure"}

**Geometry:** Standalone link target44px where styled as action; inline text remains in readable line height.

**Variants:** AR / RTL, EN / LTR

**States/events:** default, hover, focus, visited

**Keyboard:** Tab and Enter; visible underline indicates link independently of color.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U05 — TextField / Email / URL

Collect a short labeled value with suitable input semantics.

**Anatomy:** persistent label, input, hint, error text

**Editable properties:** {"type": "text|email|url", "value": "editable string", "required": "boolean when needed", "invalid": "aria-invalid", "describedBy": "hint/error ID"}

**Geometry:** 48px min control; padding12×14px;8px radius; width100%; label14px.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** empty, filled, focus, error, disabled

**Keyboard:** Native editing, Tab, paste and autocomplete; errors associated through IDs.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U06 — Textarea / Composer

Accept garment description or guided text without a photo requirement.

**Anatomy:** label, multiline field, help, submit action

**Editable properties:** {"value": "string", "placeholder": "localized example, not sole label", "rows": "content-driven", "maxLength": "only if justified"}

**Geometry:** Textarea min130px; resizable vertically; shared control radius8px.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** empty, filled, focus, error

**Keyboard:** Native multiline editing and paste; submission is a separate button.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U07 — Select / Combobox

Offer a compact set of choices using native selection behavior.

**Anatomy:** label, native select, options, selection

**Editable properties:** {"options": "value + localized label", "value": "selected key", "disabled": "boolean"}

**Geometry:** 48px min field;100% available width; native popup preserved.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** closed, open native options, selected, disabled

**Keyboard:** Native select keys and typeahead; no custom combobox behavior is claimed.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U08 — Checkbox

Set an independent yes/no fact or permission choice.

**Anatomy:** 20px native checkbox, 48px label target, optional help

**Editable properties:** {"checked": "boolean", "name": "purpose/group key", "required": "only for the stated operation"}

**Geometry:** Native20×20px box; label row min48px;12px gap.

**Variants:** AR / RTL, EN / LTR

**States/events:** unchecked, checked, focus, disabled

**Keyboard:** Space toggles; clicking label toggles; never use a color-only selected state.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U09 — Radio

Choose exactly one option in a named group.

**Anatomy:** fieldset/legend, radio inputs, option labels

**Editable properties:** {"name": "shared group key", "value": "selected option", "options": "localized labels"}

**Geometry:** 20px native controls; each option row min48px.

**Variants:** AR / RTL, EN / LTR

**States/events:** unselected, selected, focus, disabled

**Keyboard:** Native Arrow keys and Space select within a named fieldset.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U10 — Switch

Change one explicit purpose-specific local preference.

**Anatomy:** button role=switch, thumb, adjacent purpose text

**Editable properties:** {"checked": "aria-checked boolean", "purpose": "availability|offers|research", "label": "localized aria-label"}

**Geometry:** 52px width;44px target height;20px thumb; logical translation mirrors with direction.

**Variants:** AR / RTL, EN / LTR

**States/events:** off, on, focus, disabled

**Keyboard:** Space/Enter toggle; announce local state; each purpose remains independent.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U11 — Chip / Filter

Choose context/filter without discarding current task input.

**Anatomy:** chip label, pressed state, optional count

**Editable properties:** {"pressed": "boolean", "context": "work|casual|meet", "label": "localized string"}

**Geometry:** 44px min target; padding9×16px; capsule form.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** unselected, selected, focus

**Keyboard:** Native buttons toggle aria-pressed; selected style includes boundary treatment.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U12 — Tabs

Switch a related view while preserving orientation.

**Anatomy:** tablist, two tabs, associated panel

**Editable properties:** {"selectedId": "pieces|outfits", "orientation": "horizontal", "panelId": "gallery-tab-panel"}

**Geometry:** 48px tab actions; one tab in sequential order; panel grows with copy.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** active, inactive, focus

**Keyboard:** Roving Arrow/Home/End focus; Enter/Space/click selection; RTL arrows follow direction.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U13 — Dialog / Sheet

Confirm consequential local actions with a cancel route.

**Anatomy:** native dialog, heading, description, confirm, cancel

**Editable properties:** {"open": "boolean", "title": "localized string", "confirmAction": "explicit operation", "cancelAction": "keep state"}

**Geometry:** Max520px; viewport inset16px each side; padding28px; shared modal radius24px.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** closed, open, confirm, cancel

**Keyboard:** Native showModal containment; Escape closes; cancel restores opener focus.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U14 — Toast / Alert

Announce actual local success/failure and a clear next action.

**Anatomy:** symbol, message, optional recovery action

**Editable properties:** {"kind": "information|success|error", "message": "localized observable outcome", "live": "status or alert as appropriate"}

**Geometry:** Notice padding16×20px;3px logical border; body14px; shared8px radius.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** information, local success, failure with recovery

**Keyboard:** Status announced after event; urgent errors use alert; recovery remains keyboard accessible.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U15 — Tooltip / Help

Explain why a question is asked without hiding critical instructions.

**Anatomy:** native details summary, help content

**Editable properties:** {"expanded": "boolean", "summary": "question/label", "body": "explanation"}

**Geometry:** Native summary target; text wraps without fixed height.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** closed, expanded, focus

**Keyboard:** Enter/Space toggle details; help does not depend on hover alone.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U16 — Stepper / Progress

Orient the three-step task without suggesting progress from a server.

**Anatomy:** ordered steps, number, label, current state

**Editable properties:** {"current": "0|1|2", "steps": "context|piece|suggestion"}

**Geometry:** 25px numbered marker desktop22px mobile; labels reduce on narrow widths.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** upcoming, current, completed local step

**Keyboard:** Read as an ordered list; aria-current=step marks actual current stage; not false background progress.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U17 — ImageUpload / Capture

Accept an optional local file; description remains equivalent.

**Anatomy:** optional image control, format/size guidance, description alternative, error

**Editable properties:** {"accept": "image/jpeg,image/png", "maxBytes": "5242880", "image": "local ObjectURL only", "description": "alternative input"}

**Geometry:** Upload pad34px desktop24px mobile; shared card radius16px; native file control.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** empty, valid local selection, unsupported file, oversize

**Keyboard:** Native file chooser; unsupported/oversize error text; no camera permission requested silently.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U18 — GarmentCard

Show garment illustration, ownership/source and available actions.

**Anatomy:** art, ownership/source, title, metadata, actions

**Editable properties:** {"kind": "shirt|trousers|shoe|bag|scarf", "ownership": "asserted-owned|unconfirmed", "title": "localized string", "actions": "detail/delete where applicable"}

**Geometry:** 16px card radius; art160px mobile; content14–20px; SVG preserves garment silhouette.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** owned, suggested ownership unconfirmed, removed from demo

**Keyboard:** Card controls remain separate native buttons; illustration has meaningful text alternative.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U19 — OutfitCard

Present an outfit idea with editable parts and no-buy path.

**Anatomy:** outfit illustration, context, reason, save/swap actions

**Editable properties:** {"variant": "0|1|2", "saved": "boolean", "ownershipConfirmed": "false until user confirms"}

**Geometry:** Shared16px radius; artwork viewBox520×470; content stacks at600px.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** example, edited, pending save, locally saved

**Keyboard:** Save is an explicit action; guest save goes to account; unconfirmed pieces are identified.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U20 — MerchantProductCard

Keep merchant provenance, sample price and external responsibility visible.

**Anatomy:** catalog illustration, merchant/source, name, sample price, handoff

**Editable properties:** {"price": "amount + currency + status", "merchant": "fictional label in demo", "availability": "unknown|stale|known", "externalURL": "null in demo"}

**Geometry:** 16px card radius; full-width art with source/price separated from button.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** synthetic catalog, stale/unavailable design case, handoff failure

**Keyboard:** No-buy route remains available; handoff dialog explains lack of a real merchant URL.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U21 — SuggestionReason / SourceLabel

Explain a recommendation and distinguish fact from inference.

**Anatomy:** source badge, reason heading, editable explanation, unknown text

**Editable properties:** {"origin": "user-input|catalog|inference|unknown", "reason": "short localized string", "unknowns": "explicit list"}

**Geometry:** Logical green reason border; readable text flow; no confidence percentage invented.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** user input, catalog attribution, assistant inference, unknown

**Keyboard:** Explanation is readable text; source meaning never relies on color alone.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U22 — ConversationMessage / LabyState

Associate assistant copy with a real interaction state.

**Anatomy:** speaker/source, message body, event-linked Laby state

**Editable properties:** {"speaker": "user|assistant", "state": "one of11canonical states", "message": "localized text", "trigger": "real event or classified simulation"}

**Geometry:** Bubble max600px; padding18×20px;16px radius; canonical Laby simplified below64px.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** dormant, attend, ready, input, processing, result, clarify, no-result, error, success, return

**Keyboard:** Text input is not microphone listening; do not announce fabricated model activity.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U23 — Carousel / AlternativeList

Offer alternatives in a static equivalent list; no automatic cycling.

**Anatomy:** primary option, alternative list, option actions, equivalent list

**Editable properties:** {"options": "primary + two working alternatives", "selected": "option key", "expanded": "boolean when implemented"}

**Geometry:** Two alternative cards desktop/mobile;16px shared radii; no auto-advance.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** primary, alternative, expanded list

**Keyboard:** Each option is a named button; static list provides equivalent reading order.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U24 — Empty / Error / Loading

Make empty/failure/wait states actionable and truthful.

**Anatomy:** status mark, title, explanation, retry/correct/back

**Editable properties:** {"state": "empty|waiting|failure|recovered", "recoveryTarget": "S03|S16", "message": "scoped to simulated event"}

**Geometry:** Text-first centered or notice layout; no fixed height/clipping;44px recovery actions.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** empty, simulated wait, failure, retry, recovered

**Keyboard:** Errors are announced; retry returns to the relevant input; waiting copy never implies live AI.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U25 — ConsentGroup

Keep availability, offers and research choices separate.

**Anatomy:** fieldset/group title, independent purposes, switch/checkbox, help

**Editable properties:** {"purposes": "availability,offers,research", "choices": "independent booleans", "scope": "memory-only demo"}

**Geometry:** Purpose rows separate with24px-scale breathing room;44px switch target.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** unselected, selected, withdrawn local choice

**Keyboard:** Separate labelled controls; withdrawal is reversible within session; no legal-validity claim.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U26 — Account / PreferenceForm

Request account at save and support later preference changes.

**Anatomy:** form labels, name/email or preferences, scope note, save/cancel

**Editable properties:** {"mode": "guest|demo-account|preferences", "value": "editable fields", "saveState": "pending|local-saved"}

**Geometry:** 48px input controls;8px radius; one-column form on narrow view.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** guest, demo signed in, save pending, preferences edited

**Keyboard:** Native form validation and paste; account is requested at save, with a guest return.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U27 — Search / Sort

Find and order relevant records without hidden exclusion.

**Anatomy:** search label, query, status/sort select, results

**Editable properties:** {"query": "string", "status": "all|new|reviewed", "sort": "design option, not implemented order in catalog"}

**Geometry:** 48px fields; filter items flex-wrap; min150px on mobile.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** empty search, matches, no matches, selected sort

**Keyboard:** Input changes filter synthetic records; empty results include recovery copy.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U28 — Table / MobileRecordCard

Compare records on desktop and provide readable mobile cards.

**Anatomy:** column headings, rows, record action, mobile labelled card

**Editable properties:** {"records": "synthetic list", "filters": "query/status", "selectedRecord": "local ID"}

**Geometry:** Desktop table above600px; mobile record cards at600px or below;16px card radius.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** desktop rows, mobile cards, record detail, filtered empty

**Keyboard:** Use table semantics on desktop; native detail button opens dialog; row labels survive mobile stacking.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U29 — Status / Tag / VerificationLabel

Describe status/source certainty with text, never color alone.

**Anatomy:** text label, optional icon, source status

**Editable properties:** {"status": "new|reviewed|unknown", "source": "user|catalog|inference", "verified": "never inferred from record existence"}

**Geometry:** Small capsule labels; readable context; decorative sand boundary is not sole meaning.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** new, reviewed, unknown, source-labeled

**Keyboard:** Plain text conveys status; do not label a real merchant verified from demo selection.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.

## U30 — Export / ContentRevisionControls

Export synthetic records or preview local content without public publishing.

**Anatomy:** export button, draft editor, preview, local approval state

**Editable properties:** {"format": "synthetic CSV", "draft": "title/body strings", "approval": "local-demo-only"}

**Geometry:** 48px action buttons;8px radius; responsive two-column draft/preview then stack.

**Variants:** AR / RTL, EN / LTR, mobile, desktop

**States/events:** draft, local preview, locally approved, exported synthetic CSV

**Keyboard:** Explicit local actions; export contains synthetic records; no public publishing endpoint.

**Responsive:** Content-driven; 600px stacks and 900px reduces gutters; test320/390/768/1024/1440.

**AR/EN:** Keep DoLaby/email/URL/prices in LTR isolation; Arabic has no forced letter spacing.

**Token references:** --color-ivory, --color-linen, --color-ink, --color-coffee, --color-green, --color-sand; shared radii/focus/motion where applicable.

**Composition:** Compose from shared source; retain source labels, honest demo scope and a clear cancel/back path.

**Correct use:** Open the corresponding live family specimen and its linked product flow; keep editable elements separate.

**Avoid:** Do not introduce white/gold logo, automatic paid-ranking claims, false AI processing or color-only status. Flattening the specimen into a screenshot source, dropping labels/focus or claiming an unimplemented service.

**Sources/exports:** prototype/app.js; prototype/app.css; components/catalog.js. PNG is a derived preview, not the editable master.

**Rights:** Original commissioned interface code/illustrations; bundled fonts retain their OFL terms.

**Acceptance:** Open gallery and actual screen; check keyboard, labels, responsive content and applicable contrast.

**Verification limit:** SOURCE_INSPECTED; browser/assistive-technology outcomes are recorded only where actually run under05_QA.
