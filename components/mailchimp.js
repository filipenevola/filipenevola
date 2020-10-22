import React, { Fragment } from "react";

const TEXT = {
  en: {
    subscribeText: "Subscribe to receive Tips for Developers",
    subscribe: "Subscribe",
    emailPlaceholder: "email address",
    followTwitter: "Follow me on Twitter @FilipeNevola"
  },
  pt: {
    subscribeText: "Inscrave-se para receber Dicas para Desenvolvedores",
    subscribe: "Inscreva-se",
    emailPlaceholder: "seu email",
    followTwitter: "Me siga no Twitter @FilipeNevola"
  }
};

export const Mailchimp = ({ language }) => (
  <Fragment>
    <div className="text-wrap">
      <div className="text small-text follow-twitter">
        <a href="https://twitter.com/FilipeNevola">
          {TEXT[language].followTwitter}
        </a>{' '}|{' '}
        <a href="https://www.instagram.com/filipenevola/">
          Instagram
        </a>{' '}|{' '}
        <a href="http://fb.com/filipenevoladev">
          Facebook
        </a>{' '}|{' '}
        <a href="https://www.youtube.com/c/HowToCreateAnAppDev">
          Youtube
        </a>

        <div id="mc_embed_signup">
          <form
            action="https://filipenevola.us19.list-manage.com/subscribe/post?u=c962fb6df49d2882d77226e91&amp;id=c9ad8c99c1"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <label htmlFor="mce-EMAIL">{TEXT[language].subscribeText}</label>
              <input
                type="email"
                defaultValue=""
                name="EMAIL"
                className="email"
                id="mce-EMAIL"
                placeholder={TEXT[language].emailPlaceholder}
                required
              />
              <div
                style={{ position: "absolute", left: -5000 }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_c962fb6df49d2882d77226e91_c9ad8c99c1"
                  tabIndex="-1"
                  defaultValue=""
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  value={TEXT[language].subscribe}
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/*language=CSS*/}
    <style jsx>{`
      .follow-twitter {
        margin-top: 30px;
      }

      #mc_embed_signup form {
        display: flex;
        margin-top: 30px;
      }
      #mc_embed_signup_scroll {
        flex-grow: 1;
      }

      #mc_embed_signup input {
        border: 1px solid #999;
        -webkit-appearance: none;
      }

      #mc_embed_signup input:focus {
        border-color: #333;
      }

      #mc_embed_signup .button {
        background-color: #aaa;
        border: 0 none;
        border-radius: 4px;
        letter-spacing: 0.03em;
        cursor: pointer;
        display: inline-block;
        font-size: 15px;
        height: 32px;
        line-height: 32px;
        margin: 0 5px 10px 0;
        padding: 0;
        text-align: center;
        text-decoration: none;
        vertical-align: top;
        white-space: nowrap;
        width: auto;
        transition: all 0.23s ease-in-out 0s;
      }

      #mc_embed_signup .button:hover {
        background-color: #777;
      }

      #mc_embed_signup label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
      }

      #mc_embed_signup input.email {
        font-family: "Open Sans", "Helvetica Neue", Arial, Helvetica, Verdana,
          sans-serif;
        font-size: 15px;
        display: block;
        padding: 0 0.4em;
        margin: 0 4% 10px 0;
        min-height: 32px;
        width: 58%;
        min-width: 130px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
      }

      #mc_embed_signup input.button {
        display: block;
        width: 58%;
        margin: 0 0 10px 0;
        min-width: 90px;
      }
    `}</style>
  </Fragment>
);
