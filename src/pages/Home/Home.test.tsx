import { render } from '@testing-library/react';
import HomePage from '.';

test('renders HomePage by snapshot', () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="w-full max-w-screen-lg  mx-auto bg-white"
        style="min-width: 640px;"
      >
        <ul
          class="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal ant-menu-light css-dev-only-do-not-override-1km3mtt"
          data-menu-list="true"
          role="menu"
          tabindex="0"
        >
          <li
            class="ant-menu-overflow-item ant-menu-item ant-menu-item-selected ant-menu-item-only-child"
            data-menu-id="rc-menu-uuid-test-recommend"
            role="menuitem"
            style="opacity: 1; order: 0;"
            tabindex="-1"
          >
            <span
              class="ant-menu-title-content"
            >
              Recommend
            </span>
          </li>
          <li
            class="ant-menu-overflow-item ant-menu-item ant-menu-item-only-child"
            role="menuitem"
            style="opacity: 1; order: 1;"
            tabindex="-1"
          >
            <span
              class="ant-menu-title-content"
            >
              Latest
            </span>
          </li>
          <li
            class="ant-menu-overflow-item ant-menu-item ant-menu-item-only-child"
            role="menuitem"
            style="opacity: 1; order: 2;"
            tabindex="-1"
          >
            <span
              class="ant-menu-title-content"
            >
              Hot
            </span>
          </li>
          <li
            aria-hidden="true"
            class="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu ant-menu-submenu-horizontal"
            role="none"
            style="opacity: 0; height: 0px; overflow-y: hidden; order: 9007199254740991; pointer-events: none; position: absolute;"
          >
            <div
              aria-controls="rc-menu-uuid-test-rc-menu-more-popup"
              aria-expanded="false"
              aria-haspopup="true"
              class="ant-menu-submenu-title"
              data-menu-id="rc-menu-uuid-test-rc-menu-more"
              role="menuitem"
              tabindex="-1"
            >
              <span
                aria-label="ellipsis"
                class="anticon anticon-ellipsis"
                role="img"
              >
                <svg
                  aria-hidden="true"
                  data-icon="ellipsis"
                  fill="currentColor"
                  focusable="false"
                  height="1em"
                  viewBox="64 64 896 896"
                  width="1em"
                >
                  <path
                    d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"
                  />
                </svg>
              </span>
              <i
                class="ant-menu-submenu-arrow"
              />
            </div>
          </li>
        </ul>
        <div
          aria-hidden="true"
          style="display: none;"
        />
        <div
          class="px-5 pt-5"
        >
          <div
            class="infinite-scroll-component__outerdiv"
          >
            <div
              class="infinite-scroll-component "
              style="height: auto; overflow: auto;"
            >
              <div
                class="pt-5 px-5 pb-10"
              >
                <div
                  class="ant-skeleton ant-skeleton-with-avatar ant-skeleton-active css-dev-only-do-not-override-1km3mtt"
                >
                  <div
                    class="ant-skeleton-header"
                  >
                    <span
                      class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle"
                    />
                  </div>
                  <div
                    class="ant-skeleton-content"
                  >
                    <h3
                      class="ant-skeleton-title"
                      style="width: 50%;"
                    />
                    <ul
                      class="ant-skeleton-paragraph"
                    >
                      <li />
                      <li />
                      <li />
                      <li />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
