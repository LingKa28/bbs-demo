import { render } from '@testing-library/react';
import EditPage from '.';

test('renders HomePage by snapshot', () => {
  const { container } = render(<EditPage />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="w-full max-w-screen-lg mx-auto p-16 bg-white"
      >
        <form
          autocomplete="off"
          class="ant-form ant-form-vertical css-dev-only-do-not-override-1km3mtt"
          id="articleData"
        >
          <div
            class="ant-form-item css-dev-only-do-not-override-1km3mtt"
          >
            <div
              class="ant-row ant-form-item-row css-dev-only-do-not-override-1km3mtt"
            >
              <div
                class="ant-col ant-form-item-label css-dev-only-do-not-override-1km3mtt"
              >
                <label
                  class="ant-form-item-required"
                  for="articleData_title"
                  title="Title"
                >
                  Title
                </label>
              </div>
              <div
                class="ant-col ant-form-item-control css-dev-only-do-not-override-1km3mtt"
              >
                <div
                  class="ant-form-item-control-input"
                >
                  <div
                    class="ant-form-item-control-input-content"
                  >
                    <input
                      aria-required="true"
                      class="ant-input css-dev-only-do-not-override-1km3mtt"
                      id="articleData_title"
                      type="text"
                      value=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="ant-form-item css-dev-only-do-not-override-1km3mtt"
          >
            <div
              class="ant-row ant-form-item-row css-dev-only-do-not-override-1km3mtt"
            >
              <div
                class="ant-col ant-form-item-label css-dev-only-do-not-override-1km3mtt"
              >
                <label
                  class="ant-form-item-required"
                  for="articleData_description"
                  title="Description"
                >
                  Description
                </label>
              </div>
              <div
                class="ant-col ant-form-item-control css-dev-only-do-not-override-1km3mtt"
              >
                <div
                  class="ant-form-item-control-input"
                >
                  <div
                    class="ant-form-item-control-input-content"
                  >
                    <textarea
                      aria-required="true"
                      class="ant-input css-dev-only-do-not-override-1km3mtt"
                      id="articleData_description"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="ant-form-item css-dev-only-do-not-override-1km3mtt"
          >
            <div
              class="ant-row ant-form-item-row css-dev-only-do-not-override-1km3mtt"
            >
              <div
                class="ant-col ant-form-item-label css-dev-only-do-not-override-1km3mtt"
              >
                <label
                  class=""
                  for="articleData_cover"
                  title="Cover"
                >
                  Cover
                </label>
              </div>
              <div
                class="ant-col ant-form-item-control css-dev-only-do-not-override-1km3mtt"
              >
                <div
                  class="ant-form-item-control-input"
                >
                  <div
                    class="ant-form-item-control-input-content"
                  >
                    <span
                      class="ant-upload-wrapper ant-upload-picture-card-wrapper css-dev-only-do-not-override-1km3mtt"
                    >
                      <div
                        class="ant-upload-list ant-upload-list-picture-card"
                      >
                        <div
                          class="ant-upload ant-upload-select"
                        >
                          <span
                            class="ant-upload"
                            role="button"
                            tabindex="0"
                          >
                            <input
                              accept=""
                              id="articleData_cover"
                              style="display: none;"
                              type="file"
                            />
                            <div>
                              <span
                                aria-label="plus"
                                class="anticon anticon-plus"
                                role="img"
                              >
                                <svg
                                  aria-hidden="true"
                                  data-icon="plus"
                                  fill="currentColor"
                                  focusable="false"
                                  height="1em"
                                  viewBox="64 64 896 896"
                                  width="1em"
                                >
                                  <defs>
                                    <style />
                                  </defs>
                                  <path
                                    d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"
                                  />
                                  <path
                                    d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"
                                  />
                                </svg>
                              </span>
                              <div
                                style="margin-top: 8px;"
                              >
                                Upload
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="ant-form-item css-dev-only-do-not-override-1km3mtt"
          >
            <div
              class="ant-row ant-form-item-row css-dev-only-do-not-override-1km3mtt"
            >
              <div
                class="ant-col ant-form-item-label css-dev-only-do-not-override-1km3mtt"
              >
                <label
                  class="ant-form-item-required"
                  for="articleData_main"
                  title="Main"
                >
                  Main
                </label>
              </div>
              <div
                class="ant-col ant-form-item-control css-dev-only-do-not-override-1km3mtt"
              >
                <div
                  class="ant-form-item-control-input"
                >
                  <div
                    class="ant-form-item-control-input-content"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="ant-form-item css-dev-only-do-not-override-1km3mtt"
            style="text-align: center;"
          >
            <div
              class="ant-row ant-form-item-row css-dev-only-do-not-override-1km3mtt"
            >
              <div
                class="ant-col ant-form-item-control css-dev-only-do-not-override-1km3mtt"
              >
                <div
                  class="ant-form-item-control-input"
                >
                  <div
                    class="ant-form-item-control-input-content"
                  >
                    <button
                      class="ant-btn css-dev-only-do-not-override-1km3mtt ant-btn-default ant-btn-lg"
                      style="width: 250px;"
                      type="submit"
                    >
                      <span>
                        Submit
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `);
});
