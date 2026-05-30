import { onMounted, reactive, ref } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Button from '@/Components/Shared/Button.vue';
import ImageUploader from '@/Components/Admin/ImageUploader.vue';
import Field from '@/Components/Admin/AdminField.vue';
import { useAdminResource } from '@/Composables/useAdminResource';
const resource = useAdminResource('profiles');
const loading = ref(true);
const saving = ref(false);
const message = ref(null);
const existingId = ref(null);
const form = reactive({
    name_th: '',
    name_en: '',
    email: '',
    phone: '',
    avatar_path: null,
    resume_path: '',
    headline_th: '',
    headline_en: '',
    about_heading_th: '',
    about_heading_en: '',
    bio_th: '',
    bio_en: '',
    freelance_tagline_th: '',
    freelance_tagline_en: '',
    freelance_bio_th: '',
    freelance_bio_en: '',
    years_experience: 0,
});
onMounted(async () => {
    const { data } = await resource.getSingle();
    if (data) {
        existingId.value = data.id;
        for (const key of Object.keys(form)) {
            if (data[key] !== undefined && data[key] !== null)
                form[key] = data[key];
        }
    }
    loading.value = false;
});
async function save() {
    if (!form.name_th || !form.name_en || !form.headline_th || !form.headline_en || !form.bio_th || !form.bio_en) {
        message.value = { ok: false, text: 'กรุณากรอกช่องที่มีเครื่องหมาย *' };
        return;
    }
    saving.value = true;
    message.value = null;
    const payload = { ...form };
    let error;
    if (existingId.value) {
        payload.updated_at = new Date().toISOString();
        ({ error } = await resource.update(existingId.value, payload));
    }
    else {
        const res = await resource.insert(payload);
        error = res.error;
        if (res.data)
            existingId.value = res.data.id;
    }
    saving.value = false;
    message.value = error ? { ok: false, text: error } : { ok: true, text: 'บันทึกเรียบร้อย' };
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = AdminLayout || AdminLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "font-display text-2xl text-white" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-1 text-sm text-slate-400" },
});
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-6 text-slate-400" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_ctx.save) },
        ...{ class: "mt-6 space-y-6" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-2xl border border-white/10 bg-space-800/40 p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "mb-4 font-display text-lg text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 gap-4 sm:grid-cols-2" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    const __VLS_7 = Field || Field;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        label: "ชื่อ (TH)",
        required: true,
    }));
    const __VLS_9 = __VLS_8({
        label: "ชื่อ (TH)",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.name_th);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [loading, save, form,];
    var __VLS_10;
    const __VLS_13 = Field || Field;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        label: "ชื่อ (EN)",
        required: true,
    }));
    const __VLS_15 = __VLS_14({
        label: "ชื่อ (EN)",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_18 } = __VLS_16.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.name_en);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_16;
    const __VLS_19 = Field || Field;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        label: "ปีประสบการณ์",
    }));
    const __VLS_21 = __VLS_20({
        label: "ปีประสบการณ์",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "number",
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.years_experience);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_22;
    const __VLS_25 = Field || Field;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        label: "อีเมล",
    }));
    const __VLS_27 = __VLS_26({
        label: "อีเมล",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_30 } = __VLS_28.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "email",
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.email);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_28;
    const __VLS_31 = Field || Field;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        label: "โทรศัพท์",
    }));
    const __VLS_33 = __VLS_32({
        label: "โทรศัพท์",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_36 } = __VLS_34.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.phone);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_34;
    const __VLS_37 = Field || Field;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        label: "รูปโปรไฟล์",
        wide: true,
    }));
    const __VLS_39 = __VLS_38({
        label: "รูปโปรไฟล์",
        wide: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    const { default: __VLS_42 } = __VLS_40.slots;
    const __VLS_43 = ImageUploader;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
        modelValue: (__VLS_ctx.form.avatar_path),
        folder: "profile",
    }));
    const __VLS_45 = __VLS_44({
        modelValue: (__VLS_ctx.form.avatar_path),
        folder: "profile",
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    // @ts-ignore
    [form,];
    var __VLS_40;
    const __VLS_48 = Field || Field;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        label: "Resume (object key ใน Storage)",
        wide: true,
    }));
    const __VLS_50 = __VLS_49({
        label: "Resume (object key ใน Storage)",
        wide: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    const { default: __VLS_53 } = __VLS_51.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
        placeholder: "profile/resume.pdf",
    });
    (__VLS_ctx.form.resume_path);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_51;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-2xl border border-white/10 bg-space-800/40 p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "mb-4 font-display text-lg text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 gap-4 sm:grid-cols-2" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    const __VLS_54 = Field || Field;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        label: "Headline (TH)",
        required: true,
    }));
    const __VLS_56 = __VLS_55({
        label: "Headline (TH)",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    const { default: __VLS_59 } = __VLS_57.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.headline_th);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_57;
    const __VLS_60 = Field || Field;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
        label: "Headline (EN)",
        required: true,
    }));
    const __VLS_62 = __VLS_61({
        label: "Headline (EN)",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    const { default: __VLS_65 } = __VLS_63.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.headline_en);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_63;
    const __VLS_66 = Field || Field;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        label: "หัวข้อ About (TH)",
        hint: "เว้นว่างได้ — จะใช้ Headline แทน",
    }));
    const __VLS_68 = __VLS_67({
        label: "หัวข้อ About (TH)",
        hint: "เว้นว่างได้ — จะใช้ Headline แทน",
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    const { default: __VLS_71 } = __VLS_69.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.about_heading_th);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_69;
    const __VLS_72 = Field || Field;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        label: "หัวข้อ About (EN)",
        hint: "เว้นว่างได้ — จะใช้ Headline แทน",
    }));
    const __VLS_74 = __VLS_73({
        label: "หัวข้อ About (EN)",
        hint: "เว้นว่างได้ — จะใช้ Headline แทน",
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    const { default: __VLS_77 } = __VLS_75.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.about_heading_en);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_75;
    const __VLS_78 = Field || Field;
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
        label: "Bio (TH)",
        required: true,
        wide: true,
    }));
    const __VLS_80 = __VLS_79({
        label: "Bio (TH)",
        required: true,
        wide: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_79));
    const { default: __VLS_83 } = __VLS_81.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        value: (__VLS_ctx.form.bio_th),
        rows: "3",
        ...{ class: "admin-input" },
    });
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_81;
    const __VLS_84 = Field || Field;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
        label: "Bio (EN)",
        required: true,
        wide: true,
    }));
    const __VLS_86 = __VLS_85({
        label: "Bio (EN)",
        required: true,
        wide: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    const { default: __VLS_89 } = __VLS_87.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        value: (__VLS_ctx.form.bio_en),
        rows: "3",
        ...{ class: "admin-input" },
    });
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_87;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-2xl border border-white/10 bg-space-800/40 p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "mb-4 font-display text-lg text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 gap-4 sm:grid-cols-2" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    const __VLS_90 = Field || Field;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
        label: "Tagline (TH)",
    }));
    const __VLS_92 = __VLS_91({
        label: "Tagline (TH)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    const { default: __VLS_95 } = __VLS_93.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.freelance_tagline_th);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_93;
    const __VLS_96 = Field || Field;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
        label: "Tagline (EN)",
    }));
    const __VLS_98 = __VLS_97({
        label: "Tagline (EN)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    const { default: __VLS_101 } = __VLS_99.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.form.freelance_tagline_en);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_99;
    const __VLS_102 = Field || Field;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
        label: "Bio (TH)",
        wide: true,
    }));
    const __VLS_104 = __VLS_103({
        label: "Bio (TH)",
        wide: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    const { default: __VLS_107 } = __VLS_105.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        value: (__VLS_ctx.form.freelance_bio_th),
        rows: "3",
        ...{ class: "admin-input" },
    });
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_105;
    const __VLS_108 = Field || Field;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
        label: "Bio (EN)",
        wide: true,
    }));
    const __VLS_110 = __VLS_109({
        label: "Bio (EN)",
        wide: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
    const { default: __VLS_113 } = __VLS_111.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        value: (__VLS_ctx.form.freelance_bio_en),
        rows: "3",
        ...{ class: "admin-input" },
    });
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    // @ts-ignore
    [form,];
    var __VLS_111;
    if (__VLS_ctx.message) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: (__VLS_ctx.message.ok ? 'text-emerald-400' : 'text-rose-400') },
            ...{ class: "text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        (__VLS_ctx.message.text);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-end" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    const __VLS_114 = Button || Button;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
        type: "submit",
        disabled: (__VLS_ctx.saving),
    }));
    const __VLS_116 = __VLS_115({
        type: "submit",
        disabled: (__VLS_ctx.saving),
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    const { default: __VLS_119 } = __VLS_117.slots;
    (__VLS_ctx.saving ? 'กำลังบันทึก…' : 'บันทึก');
    // @ts-ignore
    [message, message, message, saving, saving,];
    var __VLS_117;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Profile.vue.js.map