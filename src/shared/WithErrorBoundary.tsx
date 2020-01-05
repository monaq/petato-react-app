import React from 'react';

const MISSING_ERROR = 'Error was swallowed during propagation.';

const withErrorBoundary = <BaseProps extends {}>(
  BaseComponent: React.ComponentType<BaseProps>,
) => {
  interface IHocProps {}
  interface IHocState {
    readonly error: Error | null | undefined;
  }

  return class Hoc extends React.Component<IHocProps, IHocState> {
    public static displayName = `withErrorBoundary(${BaseComponent.name})`;
    public static readonly WrappedComponent = BaseComponent;

    public readonly state: IHocState = {
      error: undefined,
    };

    public componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    public logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to service provider
      // tslint:disable-next-line: no-console
      console.log(
        `withErrorBoundary::${BaseComponent.name} throw error - ${error}`,
      );
    };

    public render() {
      const { children, ...restProps } = this.props;
      const { error } = this.state;

      if (error) {
        return <BaseComponent {...(restProps as BaseProps)} />;
      }

      return children;
    }
  };
};

export default withErrorBoundary;
