import { Dayjs } from "dayjs";
import React, { CSSProperties } from "react";

export default class Scheduler extends React.Component<SchedulerProps, any> { }

export class AddMorePopover extends React.Component<AddMorePopoverProps, any> { }

export interface SchedulerProps {
    schedulerData: SchedulerData;
    prevClick(schedulerData: SchedulerData): void;
    nextClick(schedulerData: SchedulerData): void;
    onSelectDate(schedulerData: SchedulerData, date: string): void;
    onViewChange(schedulerData: SchedulerData, view: View): void;
    eventItemClick?(schedulerData: SchedulerData, event: Event): void;
    eventItemTemplateResolver?(
        schedulerData: SchedulerData,
        event: Event,
        bgColor: string,
        isStart: boolean,
        isEnd: boolean,
        mustAddCssClass: string,
        mustBeHeight: number,
        agendaMaxEventWidth: number,
    ): void;
    eventItemPopoverTemplateResolver?(
        schedulerData: SchedulerData,
        eventItem: Event,
        title: string,
        start: Dayjs,
        end: Dayjs,
        statusColor: string,
    ): void;
    toggleExpandFunc?: (
        schedulerData: SchedulerData,
        slotId: string
    ) => void;
    viewEventClick?: (schedulerData: SchedulerData, event: Event) => void;
    viewEventText?: string;
    viewEvent2Text?: string;
    viewEvent2Click?: (schedulerData: SchedulerData, event: Event) => void;
    updateEventStart?: (schedulerData: SchedulerData, event: Event, newStart: string) => void;
    updateEventEnd?: (schedulerData: SchedulerData, event: Event, newEnd: string) => void;
    moveEvent?: (schedulerData: SchedulerData, event: Event, slotId: string, slotName: string, start: string, end: string) => void;
    newEvent?: (schedulerData: SchedulerData, slotId: string, slotName: string, start: string, end: string, type: string, item: Event) => void;
    onScrollLeft?: (schedulerData: Scheduler, schedulerContent: React.ReactNode, maxScrollLeft: number) => void;
    onScrollRight?: (schedulerData: Scheduler, schedulerContent: React.ReactNode, maxScrollLeft: number) => void;
    onScrollTop?: (schedulerData: Scheduler, schedulerContent: React.ReactNode, maxScrollTop: number) => void;
    onScrollBottom?: (schedulerData: Scheduler, schedulerContent: React.ReactNode, maxScrollTop: number) => void;
    onSetAddMoreState?: (newState: State) => void;
    conflictOccurred?: (schedulerData: SchedulerData, action: string, item: Event, type: string, slotId: string, slotName, newStart: string, newEnd: string) => void;
    nonAgendaCellHeaderTemplateResolver?: (schedulerData: Scheduler, item: Event, formattedDateItems: string[], style: CSSProperties) => void;
    subtitleGetter?: (schedulerData: SchedulerData, event: Event) => void;
    movingEvent?: (schedulerData: SchedulerData, slotId: string, slotName: string, newStart: string, newEnd: string, action: string, type: string, item: Event) => void;
    slotClickedFunc?: (schedulerData: SchedulerData, slot: ResourceEvent) => void;
    slotItemTemplateResolver?: (
        schedulerData: SchedulerData,
        slot: ResourceEvent, slotClickedFunc: (schedulerData: SchedulerData, slot: ResourceEvent) => void,
        width: number,
        clsName: string
    ) => void;
    leftCustomHeader?: React.ReactNode;
    rightCustomHeader?: React.ReactNode;
    dndSources?: DnDSource[],
}

export interface AddMorePopoverProps {
    schedulerData: SchedulerData
    headerItem: HeaderItem,
    left: number,
    top: number,
    height: number,
    closeAction: PropTypes.func.isRequired,
    subtitleGetter?: SchedulerProps['subtitleGetter'];
    moveEvent?: SchedulerProps['moveEvent'];
    eventItemClick?: SchedulerProps['eventItemClick'];
    viewEventClick?: SchedulerProps['viewEventClick'];
    viewEventText?: string,
    viewEvent2Text?: string,
    viewEvent2Click?: SchedulerProps['viewEvent2Click'];
    eventItemTemplateResolver?: SchedulerProps['eventItemTemplateResolver'];
}

export class SchedulerData {
    localeDaysjs(date: string): Dayjs;
    cellUnit: CellUnit;
    viewType: ViewType;
    startDate: string;

    constructor(
        date?: string,
        viewType?: ViewType,
        showAgenda?: boolean,
        isEventPerspective?: boolean,
        newConfig?: SchedulerDataConfig,
        newBehaviours?: object
    );

    setResources(resources: Resource[]): void;
    setEvents(events: Event[]): void;
    prev(): void;
    next(): void;
    setViewType(viewType?: View, showAgenda?: boolean, isEventPerspective?: boolean): void;
    setDate(date?: string): void;
    toggleExpandStatus(slotId: string): void;
    removeEventById(eventId: string): void;
    removeEvent(event: Event): void;
    isEventInTimeWindow(eventStart: Date | Dayjs, eventEnd: Date | Dayjs, windowStart: Date | Dayjs, windowEnd: Date | Dayjs): boolean;
    addEvent(newEvent: Event): void;
    getResourceById(resourceId: string): ResourceEvent;
    setSchedulerLocale(lang: string): void;
    setCalendarPopoverLocale(lang: string): void;
}

export class DnDSource {
    constructor(
        resolveDragObjFunc: (props: {}) => any,
        DecoratedComponent: React.ReactNode,
        dragAnDropEnabled: boolean,
        dndType: string
    );
}

export enum CellUnit {
    Day,
    Hour,
}

export enum ViewType {
    Day,
    Week,
    Month,
    Quarter,
    Year,
    Custom,
    Custom1,
    Custom2,
}

export interface View {
    viewName?: string
    viewType: ViewType;
    showAgenda: boolean;
    isEventPerspective: boolean;
}

export interface EventItem {
    id: number;
    start: string;
    end: string;
    resourceId: string;
    title: string;
    bgColor?: string;
    rrule?: string;
    showPopover?: boolean;
    resizable?: boolean;
    movable?: boolean;
    startResizable?: boolean;
    endResizable?: boolean;
}

export interface ResourceEvent {
    id: number;
    name: string;
    parentId?: string;
    groupOnly?: boolean;
    hasSummary?: boolean;
    expanded?: boolean;
    headerItems?: Event[];
    render?: boolean;
    rowHeight: number;
    rowMaxCount: number;
}

export interface Resource {
    id: string;
    name: string;
    groupOnly?: boolean;
}

export interface HeaderItem {
    time: string;
    start: string;
    end: string;
    addMore: number,
    addMoreIndex: number,
    count: number;
    nonWorkingTime: boolean;
    events: Event[];
}

export interface State {
    headerItem: HeaderItem;
    left: number,
    top: number,
    height: number;
}

export interface SchedulerDataConfig {
    schedulerWidth?: string | number;
    besidesWidth?: number;
    schedulerMaxHeight?: number;
    tableHeaderHeight?: number;
    schedulerContentHeight?: string | number;
    agendaResourceTableWidth?: string | number;
    agendaMaxEventWidth?: string | number;
    dayResourceTableWidth?: string | number;
    weekResourceTableWidth?: string | number;
    monthResourceTableWidth?: string | number;
    quarterResourceTableWidth?: string | number;
    yearResourceTableWidth?: string | number;
    customResourceTableWidth?: string | number;
    dayCellWidth?: string | number;
    weekCellWidth?: string | number;
    monthCellWidth?: string | number;
    quarterCellWidth?: string | number;
    yearCellWidth?: string | number;
    customCellWidth?: string | number;
    dayMaxEvents?: number;
    weekMaxEvents?: number;
    monthMaxEvents?: number;
    quarterMaxEvents?: number;
    yearMaxEvents?: number;
    customMaxEvents?: number;
    eventItemPopoverTrigger?: 'hover' | 'click';
    eventItemHeight?: number;
    eventItemLineHeight?: number;
    nonAgendaSlotMinHeight?: number;
    dayStartFrom?: number;
    dayStopTo?: number;
    defaultEventBgColor?: string;
    selectedAreaColor?: string;
    nonWorkingTimeHeadColor?: string;
    nonWorkingTimeHeadBgColor?: string;
    nonWorkingTimeBodyBgColor?: string;
    summaryColor?: string;
    summaryPos?: SummaryPos;
    groupOnlySlotColor?: string;
    startResizable?: boolean;
    endResizable?: boolean;
    movable?: boolean;
    creatable?: boolean;
    crossResourceMove?: boolean;
    checkConflict?: boolean;
    scrollToSpecialDaysjsEnabled?: boolean;
    eventItemPopoverEnabled?: boolean;
    calendarPopoverEnabled?: boolean;
    recurringEventsEnabled?: boolean;
    viewChangeSpinEnabled?: boolean;
    dateChangeSpinEnabled?: boolean;
    headerEnabled?: boolean;
    displayWeekend?: boolean;
    relativeMove?: boolean;
    defaultExpanded?: boolean;
    dragAndDropEnabled?: boolean;
    schedulerHeaderEventsFuncsTimeoutMs?: number;
    resourceName?: string;
    taskName?: string;
    agendaViewHeader?: string;
    addMorePopoverHeaderFormat?: string;
    eventItemPopoverDateFormat?: string;
    nonAgendaDayCellHeaderFormat?: string;
    nonAgendaOtherCellHeaderFormat?: string;
    minuteStep?: number;
    views?: View[];
}

export enum SummaryPos {
    Top,
    TopRight,
    TopLeft,
    Bottom,
    BottomRight,
    BottomLeft,
}

export interface SchedulerDataBehaviors {
    isNonWorkingTimeFunc?(schedulerData: SchedulerData, time: string): boolean;
    getCustomDateFunc?(
        schedulerData: SchedulerData,
        num: number,
        date?: string,
    ): { startDate: string; endDate: string; cellUnit: CellUnit };
    getEventTextFunc: (schedulerData: SchedulerData, event: Event) => string;
    getDateLabel: (schedulerData: SchedulerData, viewType: ViewType, startDate: string | Date, endDate: string | Date) => string;
    getScrollSpecialDayjs: (schedulerData: SchedulerData, startDayjs: Dayjs, endDays: Dayjs) => Dayjs;
    getSummaryFunc: undefined;
    getCustomDateFunc: undefined;
}
