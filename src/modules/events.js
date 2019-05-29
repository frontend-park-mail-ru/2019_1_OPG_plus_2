/* Общие события */

export const INIT_EVENT = 'init';
export const INIT_ERROR_EVENT = 'init_error';

/* Изменение профиля */

export const USER_UPDATED_ERROR_EVENT = 'userUpadatedError';

/* Профиль */

export const LOGOUT_EVENT = 'logout';
export const LOGOUTED_EVENT = 'logouted';

/* Таблица лидеров */

export const GET_NEXT_PAGE_EVENT = 'getNextPage';
export const GOT_NEXT_PAGE_EVENT = 'gotNextPage';

/* Авторизация */

export const SIGN_IN_OK_EVENT = 'signInOK';
export const SIGN_IN_ERROR_EVENT = 'signInError';
export const SIGN_IN_SUBMIT_EVENT = 'signInSubmit';

/* Регистрация */

export const SIGN_UP_OK_EVENT = 'signInOK';
export const SIGN_UP_ERROR_EVENT = 'signUpError';
export const SIGN_UP_SUBMIT_EVENT = 'signUpError';

/* Игра */

export const DOWN_EVENT = 'startStep';
export const END_DOWN_EVENT = 'endStartStep';

export const OVER_BLOCK_EVENT = 'overBlockEvent';
export const END_OVER_BLOCK_EVENT = 'endOverBlockEvent';

export const OUT_BLOCK_EVENT = 'outBlockEvent';
export const END_OUT_BLOCK_EVENT = 'endOutBlockEvent';

export const UP_BLOCK_EVENT = 'finishStepBlock';
export const UP_OUT_FIELD_EVENT = 'finishStepOutField';

export const FINISH_STEP_EVENT = 'finishStep';
export const FINISH_GAME_EVENT = 'finishGame';

export const GENERATE_URL_EVENT = 'generateUrl';
export const FINISH_GENERATE_URL_EVENT = 'finishGenerateUrl';
export const FINISH_GENERATE_URL_ERROR_EVENT = 'finishGenerateUrlError';

/* Мультиплеер */

export const START_GAME = 'startGame';