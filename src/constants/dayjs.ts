import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(localeData);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);
dayjs.extend(quarterOfYear);
dayjs.extend(relativeTime);
