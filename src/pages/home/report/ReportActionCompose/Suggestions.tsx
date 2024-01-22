import type {ForwardedRef} from 'react';
import React, {forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef} from 'react';
import type {NativeSyntheticEvent, TextInputSelectionChangeEventData} from 'react-native';
import {View} from 'react-native';
import {DragAndDropContext} from '@components/DragAndDrop/Provider';
import usePrevious from '@hooks/usePrevious';
import type {SuggestionsRef} from './ReportActionCompose';
import SuggestionEmoji from './SuggestionEmoji';
import SuggestionMention from './SuggestionMention';

type Selection = {
    start: number;
    end: number;
};

type SuggestionProps = {
    value: string;
    setValue: (newValue: string) => void;
    selection: Selection;
    setSelection: (newSelection: Selection) => void;
    updateComment: (newComment: string, shouldDebounceSaveComment?: boolean) => void;
    measureParentContainer: () => void;
    isComposerFullSize: boolean;
    isComposerFocused?: boolean;
    resetKeyboardInput?: () => void;
    isAutoSuggestionPickerLarge?: boolean;
    composerHeight?: number;
};

/**
 * This component contains the individual suggestion components.
 * If you want to add a new suggestion type, add it here.
 *
 */
function Suggestions(
    {
        isComposerFullSize,
        value,
        setValue,
        selection,
        setSelection,
        updateComment,
        composerHeight,
        resetKeyboardInput,
        measureParentContainer,
        isAutoSuggestionPickerLarge = true,
        isComposerFocused,
    }: SuggestionProps,
    ref: ForwardedRef<SuggestionsRef>,
) {
    const suggestionEmojiRef = useRef<SuggestionsRef>(null);
    const suggestionMentionRef = useRef<SuggestionsRef>(null);
    const {isDraggingOver} = useContext(DragAndDropContext);
    const prevIsDraggingOver = usePrevious(isDraggingOver);

    const getSuggestions = useCallback(() => {
        if (suggestionEmojiRef.current?.getSuggestions) {
            const emojiSuggestions = suggestionEmojiRef.current.getSuggestions();
            if (emojiSuggestions.length > 0) {
                return emojiSuggestions;
            }
        }

        if (suggestionMentionRef.current?.getSuggestions) {
            const mentionSuggestions = suggestionMentionRef.current.getSuggestions();
            if (mentionSuggestions.length > 0) {
                return mentionSuggestions;
            }
        }

        return [];
    }, []);

    /**
     * Clean data related to EmojiSuggestions
     */
    const resetSuggestions = useCallback(() => {
        suggestionEmojiRef.current?.resetSuggestions();
        suggestionMentionRef.current?.resetSuggestions();
    }, []);

    /**
     * Listens for keyboard shortcuts and applies the action
     */
    const triggerHotkeyActions = useCallback((e: KeyboardEvent) => {
        const emojiHandler = suggestionEmojiRef.current?.triggerHotkeyActions(e);
        const mentionHandler = suggestionMentionRef.current?.triggerHotkeyActions(e);
        return emojiHandler ?? mentionHandler;
    }, []);

    const onSelectionChange = useCallback((e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        const emojiHandler = suggestionEmojiRef.current?.onSelectionChange?.(e);
        return emojiHandler;
    }, []);

    const updateShouldShowSuggestionMenuToFalse = useCallback(() => {
        suggestionEmojiRef.current?.updateShouldShowSuggestionMenuToFalse();
        suggestionMentionRef.current?.updateShouldShowSuggestionMenuToFalse();
    }, []);

    const setShouldBlockSuggestionCalc = useCallback((shouldBlock: boolean) => {
        suggestionEmojiRef.current?.setShouldBlockSuggestionCalc(shouldBlock);
        suggestionMentionRef.current?.setShouldBlockSuggestionCalc(shouldBlock);
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            resetSuggestions,
            onSelectionChange,
            triggerHotkeyActions,
            updateShouldShowSuggestionMenuToFalse,
            setShouldBlockSuggestionCalc,
            getSuggestions,
        }),
        [onSelectionChange, resetSuggestions, setShouldBlockSuggestionCalc, triggerHotkeyActions, updateShouldShowSuggestionMenuToFalse, getSuggestions],
    );

    useEffect(() => {
        if (!(!prevIsDraggingOver && isDraggingOver)) {
            return;
        }
        updateShouldShowSuggestionMenuToFalse();
    }, [isDraggingOver, prevIsDraggingOver, updateShouldShowSuggestionMenuToFalse]);

    const baseProps = {
        value,
        setValue,
        setSelection,
        selection,
        isComposerFullSize,
        updateComment,
        composerHeight,
        isAutoSuggestionPickerLarge,
        measureParentContainer,
        isComposerFocused,
    };

    return (
        <View testID="suggestions">
            <SuggestionEmoji
                ref={suggestionEmojiRef}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...baseProps}
                resetKeyboardInput={resetKeyboardInput}
            />
            <SuggestionMention
                ref={suggestionMentionRef}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...baseProps}
            />
        </View>
    );
}

Suggestions.displayName = 'Suggestions';

export default forwardRef(Suggestions);

export type {SuggestionProps};
