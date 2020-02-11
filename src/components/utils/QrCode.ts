import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";
import QRious from "qrious";

@Component
export default class QrCode extends Vue {
  @Prop({ required: true }) public value: string;
  @Prop({ required: false }) public options: object;

  @Watch("value")
  public onValueChanged() {
    this.generate();
  }

  @Watch("options")
  public onOptionsChanged() {
    this.generate();
  }

  public mounted() {
    this.generate();
  }

  public render(createElement: CreateElement): VNode {
    return createElement("canvas", this.$slots.default);
  }

  private generate() {
    // tslint:disable-next-line: no-unused-expression
    new QRious(
      Object.assign(
        {
          element: this.$el,
          value: this.value,
        },
        this.options,
      ),
    );
  }
}
