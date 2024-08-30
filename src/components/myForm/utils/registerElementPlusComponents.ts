import {
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElOption,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElUpload
} from 'element-plus';

export function registerElementPlusComponents(app) {
  app.component(ElCascader.name, ElCascader);
  app.component(ElCheckbox.name, ElCheckbox);
  app.component(ElCheckboxGroup.name, ElCheckboxGroup);
  app.component(ElCheckboxButton.name, ElCheckboxButton);
  app.component(ElColorPicker.name, ElColorPicker);
  app.component(ElDatePicker.name, ElDatePicker);
  app.component(ElInput.name, ElInput);
  app.component(ElInputNumber.name, ElInputNumber);
  app.component(ElRadio.name, ElRadio);
  app.component(ElRadioGroup.name, ElRadioGroup);
  app.component(ElRate.name, ElRate);
  app.component(ElSelect.name, ElSelect);
  app.component(ElOption.name, ElOption);
  app.component(ElSlider.name, ElSlider);
  app.component(ElSwitch.name, ElSwitch);
  app.component(ElTimePicker.name, ElTimePicker);
  app.component(ElTimeSelect.name, ElTimeSelect);
  app.component(ElTransfer.name, ElTransfer);
  app.component(ElUpload.name, ElUpload);
}
